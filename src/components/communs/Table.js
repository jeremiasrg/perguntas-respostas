import React, { useState, useEffect, useContext } from "react";
import { Table, Dropdown, Button } from "react-bootstrap";
import ModalForm from "./ModalForm";
import * as FiIcons from "react-icons/fi";
import ModalConfirm from "./ModalConfirm";
import Titulo from "../Titulo";
import { strToUpperCase } from "../../base/helper";
import * as DateUtils from "../../base/utils/dateUtils";
import * as APIUtils from "../../base/utils/apiUtils";
import * as TokenUtils from "../../base/utils/tokenUtils";
import { mergeValuesAndData } from "../../base/utils/dataUtils";
// import { GlobalContext } from "../../providers/global";

export default function MyTable(props) {
  const [tableData, setTableData] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [modalConfirmShow, setModalConfirmShow] = useState(false);
  const [header, setHeader] = useState([]);
  const [idDeletar, setIdDeletar] = useState(null);
  const [data, setData] = useState(props.data);

  // const { setGlobal } = useContext(GlobalContext);

  useEffect(() => {
    getHeader();
    async function callAPI() {
      // setGlobal({ isLoading: true });
      await getDataApi();
      // setGlobal({ isLoading: false });
    }
    callAPI();
  }, [data]);

  const mountHeader = (header, replace) => {
    return header.map((value, i) => {
      return <th key={i}>{value}</th>;
    });
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <FiIcons.FiMoreVertical className="moreAction"> </FiIcons.FiMoreVertical>
      {children}
    </a>
  ));

  const onEdit = async (row) => {
    // TODO pegar row._id chamar a api e passar o retorno para o metodo abaixo.
    //Fazendo isso a linha sempre estará atualizada.

    let rt = await mergeValuesAndData(data, row);

    setModalData(rt);
    setModalShow(true);
  };

  const onDelete = async () => {
    let idUsuario = TokenUtils.getIdUserFromAppToken();

    await APIUtils.invokeRemoveAPI(
      data.context,
      idDeletar,
      idUsuario,
      APIUtils.getToken()
    );
    setModalConfirmShow(false);
    setIdDeletar(null);
    getDataApi();
  };

  const getHeader = () => {
    const header = [];
    data.fields.map((value, i) => {
      if (value.showInTable !== false && value.type !== "Title") {
        header.push(value.label);
      }
    });
    setHeader(header);
  };

  const isAction = () => {
    return data.edit || data.create || data.delete;
  };

  const getDataApi = async () => {
    const dataApi = await APIUtils.invokeGetAPI(
      data.context +
        (data.getContextParams !== undefined ? data.getContextParams : ""),
      APIUtils.getToken()
    );
    setTableData(dataApi);
    setModalShow(false);
  };

  const mountBody = () => {
    if (tableData !== undefined && tableData.length > 0) {
      return tableData.map((value, i) => (
        <tr key={i}>
          {mountRow(value)}
          {isAction() && (
            <td key={i}>
              <div style={{ display: "flex" }}>
                {data.edit && (
                  <Button
                    onClick={
                      props.onEdit
                        ? () => {
                            props.onEdit(value);
                          }
                        : () => {
                            onEdit(value);
                          }
                    }
                    variant="light"
                  >
                    <FiIcons.FiEdit className="color-green"></FiIcons.FiEdit>
                  </Button>
                )}
                <div style={{ width: "5px" }}></div>
                {data.delete && (
                  <Button
                    onClick={
                      props.onDelete
                        ? props.onDelete
                        : () => {
                            setIdDeletar(value._id);
                            setModalConfirmShow(true);
                          }
                    }
                    variant="light"
                  >
                    <FiIcons.FiTrash2 className="color-danger"></FiIcons.FiTrash2>
                  </Button>
                )}
              </div>
            </td>
          )}
        </tr>
      ));
    } else {
      return (
        <tr>
          <td colSpan="1000" align="center">
            Nenhum registro encontrado
          </td>
        </tr>
      );
    }
  };

  const mountRow = (row) => {
    // console.log(row);

    return data.fields.map((value, i) => {
      if (value.showInTable !== false && value.type !== "Title") {
        return <td key={i}>{getRowValue(row, value)}</td>;
      }
    });
  };

  const getRowValue = (row, value) => {
    if (value.type === "InputDate") {
      let valor = eval("row." + value.name);
      return DateUtils.formatDate(valor);
    } else if (value.type === "MultipleSelectBox") {
      if (value.display !== undefined && value.display === "label") {
        let valor = eval("row." + value.name);
        let valorFinal = "";
        let options = value.options;

        for (let option in options) {
          if (valor.includes(options[option].value)) {
            valorFinal = valorFinal + options[option].label + "/ ";
          }
        }
        return valorFinal.substr(0, valorFinal.length - 2);
      } else if (value.display !== undefined) {
        let indexUltimoPonto = value.display.lastIndexOf(".");
        let nomeArray = value.display.substr(0, indexUltimoPonto);
        let nomeAtributoArrray = value.display.substr(indexUltimoPonto + 1);

        let valor = eval("row." + nomeArray);

        let valorFinal = "";
        for (let index = 0; index < valor.length; index++) {
          valorFinal = valorFinal + valor[index][nomeAtributoArrray] + ", ";
        }

        return valorFinal.substr(0, valorFinal.length - 2);
      }
    } else if (value.display !== undefined) {
      let valor = "";
      try {
        valor = eval("row." + value.display);
        return valor;
      } catch (e) {
        return "";
      }
    } else if (value.type === "InputText" && value.mask === "currency") {
      let valor = eval("row." + value.name);
      let valorString =
        valor === undefined || valor === null ? "" : valor.toFixed(2) + "";
      return (
        "R$ " + (valor === undefined ? " - " : valorString.replace(".", ","))
      );
    } else {
      try {
        let a = eval("row." + value.name);
        if (a === true) {
          return "Sim";
        } else if (a === false) {
          return "Não";
        } else {
          return a;
        }
      } catch (error) {
        return "";
      }

      //return !row[value.name] ? eval("row." + value.name) : row[value.name];
    }
  };

  return (
    <div className="table-wrapper">
      {props.create !== false ? (
        <div className="toolbar">
          <div className="title">
            {data.list && data.list.title
              ? data.list.title
              : `${strToUpperCase(data.context.substr(1))}`}
          </div>
          {data.create && (
            <div className="btn-novo">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setModalData(data);
                  return setModalShow(true);
                }}
              >
                <FiIcons.FiPlusSquare
                  style={{
                    marginRight: "3px",
                    marginBottom: "2px",
                    fontSize: "1.3rem",
                  }}
                ></FiIcons.FiPlusSquare>
                Novo
              </Button>
            </div>
          )}
        </div>
      ) : null}

      <Table hover>
        <thead>
          <tr>
            {mountHeader(header, false)}
            {isAction() && (
              <th width="10px" style={{ textAlign: "center" }}>
                Ações
              </th>
            )}
          </tr>
        </thead>
        <tbody>{mountBody()}</tbody>
      </Table>

      {modalData !== null ? (
        <ModalForm
          size="lg"
          show={modalShow}
          onClose={getDataApi}
          onHide={() => {
            setModalData(null);
            setModalShow(false);
          }}
          data={modalData}
        />
      ) : null}

      <ModalConfirm
        show={modalConfirmShow}
        onConfirm={() => {
          onDelete();
        }}
        onClose={() => {
          setModalConfirmShow(false);
        }}
      ></ModalConfirm>
    </div>
  );
}
