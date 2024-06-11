import { useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

function ToaThuoc() {
  const [listChild, setListChild] = useState({
    child1: {
      url: "",
      description: "",
    },
  });

  const handleOnchangeInput = (key, name, value) => {
    let _listChild = _.cloneDeep(listChild);
    _listChild[key][name] = value;
    setListChild(_listChild);
  };

  const handleClickAdd = () => {
    let _listChild = _.cloneDeep(listChild);
    _listChild[`child-${uuidv4()}`] = {
      url: "",
      description: "",
    };
    setListChild(_listChild);
  };

  const handleDeleteEle = (key) => {
    let _listChild = _.cloneDeep(listChild);
    delete _listChild[key];
    setListChild(_listChild);
  };

  const handleSave = () => {
    console.log("Check role: ", listChild);
  };

  return (
    <div className="role-container">
      <div className="container">
        <div className="role-parent mt-3">
          {Object.entries(listChild).map(([key, child], index) => {
            return (
              <div className="row role-child" key={`child-${key}`}>
                <div className={`col-5 form-group ${key}`}>
                  <label>Tên thuốc</label>
                  <input
                    type="text"
                    className="form-control"
                    value={child.url}
                    onChange={(e) =>
                      handleOnchangeInput(key, "url", e.target.value)
                    }
                  />
                </div>
                <div className={`col-5 form-group`}>
                  <label>Liều lượng</label>
                  <input
                    type="text"
                    className="form-control"
                    value={child.description}
                    onChange={(e) =>
                      handleOnchangeInput(key, "description", e.target.value)
                    }
                  />
                </div>
                <div className="col-2 mt-4 action">
                  <button
                    className="btn btn-success m-2"
                    onClick={() => handleClickAdd()}
                  >
                    Thêm
                  </button>
                  {index >= 1 && (
                    <button
                      className="btn btn-danger ml-2"
                      onClick={() => handleDeleteEle(key)}
                    >
                      Xóa
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ToaThuoc;
