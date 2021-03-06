import { useState, useEffect } from "react";
import {
  Dialog,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
} from "@mui/material";
import { Save, Add } from "@mui/icons-material";
import { createUser, updateUser } from "redux/userSlice";
import { useSelector, useDispatch } from "react-redux";

const EditDialog = ({ isOpen, onClose, data }) => {
  const users = useSelector((store) => store.user.data);
  const dispatch = useDispatch();
  const [user, setUser] = useState(data);
  const [errorMessage, setErrorMessage] = useState({});
  const [isChangePassword, setChangePassord] = useState(false);

  let isUpdate = typeof data?.id === "number";
  let isValid =
    user?.name?.length > 0 &&
    user?.gender?.length > 0 &&
    /^[a-zA-Z0-9_-]{8,16}$/g.test(user?.username) &&
    (!users.find((item) => item.username === user?.username) ||
      user?.username === data.username) &&
    /^.+@(\w{2,}\.){1,2}\w{2,}$/gi.test(user?.email) &&
    (!users.find((item) => item.email === user?.email) ||
      user?.email === data.email);

  if ((isUpdate && isChangePassword) || !isUpdate) {
    isValid =
      isValid &&
      user?.password?.length > 0 &&
      /[a-z]/g.test(user?.password) &&
      /[A-Z]/g.test(user?.password) &&
      /[0-9]/g.test(user?.password) &&
      /[!@#$%^&*()_-]/g.test(user?.password) &&
      user?.password === user.passwordConfirm;
  }

  const hanldeSubmit = async () => {
    user.passwordConfirm = undefined;
    user.role = "user";
    if (isUpdate) {
      dispatch(updateUser(user));
    } else {
      dispatch(createUser(user));
    }
    onClose();
  };

  useEffect(() => {
    setUser({ ...data, password: undefined, passwordConfirm: undefined });
    setChangePassord(false);
    setErrorMessage({});
  }, [data]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      scroll="body"
      maxWidth="md"
      fullWidth
    >
      <div className="p-4 md:p-8">
        <div>
          <h2 className="text-2xl text-primary font-bold">
            {isUpdate > 0 ? "S???a" : "Th??m"} ng?????i d??ng
          </h2>
        </div>
        <div className="mt-6">
          <p className="mb-2 text-slate-600 font-semibold">
            T??n hi???n th??? <span className="text-red-500">*</span>
          </p>
          <TextField
            size="small"
            placeholder="Nh???p t??n hi???n th???"
            fullWidth
            value={user?.name || ""}
            onChange={(e) => {
              let value = e.target.value;
              let message = "";
              if (!value) {
                message = "T??n hi???n th??? kh??ng ???????c tr???ng";
              }
              setErrorMessage((prev) => ({ ...prev, name: message }));
              setUser((prev) => ({ ...prev, name: e.target.value }));
            }}
            error={!!errorMessage.name}
            helperText={errorMessage.name}
          />
        </div>

        <div className="md:flex w-full">
          <div className="mt-6 w-full md:w-1/2 md:mr-4">
            <p className="mb-2 text-slate-600 font-semibold">
              T??n ????ng nh???p <span className="text-red-500">*</span>
            </p>
            <TextField
              size="small"
              placeholder="Nh???p t??n ????ng nh???p"
              fullWidth
              value={user?.username || ""}
              onChange={(e) => {
                let value = e.target.value;
                let message = "";
                if (!value) {
                  message = "T??n ????ng nh???p kh??ng ???????c tr???ng";
                } else if (value?.length < 8 || value?.length > 16) {
                  message = "T??n ????ng nh???p ph???i d??i t??? 8 - 16 k?? t???";
                } else if (!/^[a-zA-Z0-9_-]{8,16}$/g.test(value)) {
                  message =
                    "T??n ????ng nh???p ch??? cho ph??p ch??? th?????ng, ch??? hoa, ch??? s??? v?? c??c k?? t??? _ -";
                } else if (
                  users.find((item) => item.username === value) &&
                  value !== data.username
                ) {
                  message =
                    "T??n ????ng nh???p ???? t???n t???i, vui l??ng ch???n t??n ????ng nh???p kh??c";
                }
                setErrorMessage((prev) => ({ ...prev, username: message }));
                setUser((prev) => ({ ...prev, username: value }));
              }}
              error={!!errorMessage.username}
              helperText={errorMessage.username}
            />
          </div>
          <div className="mt-6 w-full md:w-1/2 md:ml-4">
            <p className="mb-2 text-slate-600 font-semibold">
              Email <span className="text-red-500">*</span>
            </p>
            <TextField
              size="small"
              placeholder="Nh???p email"
              fullWidth
              value={user?.email || ""}
              onChange={(e) => {
                let value = e.target.value;
                let message = "";
                if (value?.length === 0) {
                  message = "Email kh??ng ???????c ????? tr???ng";
                } else if (!/^.+@(\w{2,}\.){1,2}\w{2,}$/gi.test(value)) {
                  message = "Email kh??ng ????ng ?????nh d???ng";
                } else if (
                  users.find((item) => item.email === value) &&
                  value !== data.email
                ) {
                  message = "Email ???? t???n t???i, vui l??ng ch???n email kh??c";
                }
                setErrorMessage((prev) => ({ ...prev, email: message }));
                setUser((prev) => ({ ...prev, email: value }));
              }}
              error={!!errorMessage.email}
              helperText={errorMessage.email}
            />
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-2 text-slate-600 font-semibold">
            Gi???i t??nh <span className="text-red-500">*</span>
          </p>
          <RadioGroup
            row
            value={user?.gender || null}
            onChange={(e) => {
              setUser((prev) => ({ ...prev, gender: e.target.value }));
            }}
          >
            <FormControlLabel value="M" control={<Radio />} label="Nam" />
            <FormControlLabel value="F" control={<Radio />} label="N???" />
          </RadioGroup>
        </div>

        {isUpdate && (
          <div className="flex items-center gap-1 mt-6">
            <p className="text-slate-600 font-semibold">?????i m???t kh???u</p>
            <Switch onChange={(e) => setChangePassord(e.target.checked)} />
          </div>
        )}

        {(!isUpdate || isChangePassword) && (
          <div className="md:flex w-full">
            <div className="mt-6 w-full md:w-1/2 md:mr-4">
              <p className="mb-2 text-slate-600 font-semibold">
                M???t kh???u <span className="text-red-500">*</span>
              </p>
              <TextField
                size="small"
                type="password"
                placeholder="Nh???p m???t kh???u"
                fullWidth
                value={user?.password || ""}
                onChange={(e) => {
                  let value = e.target.value;
                  let message = "";
                  if (value?.length === 0) {
                    message = "M???t kh???u kh??ng ???????c ????? tr???ng";
                  } else if (value?.length < 8) {
                    message = "????? d??i m???t kh???u ph???i l???n h??n 8";
                  } else if (
                    !/[a-z]/g.test(value) ||
                    !/[A-Z]/g.test(value) ||
                    !/[0-9]/g.test(value) ||
                    !/[!@#$%^&*()_-]/g.test(value)
                  ) {
                    message =
                      "M???t kh???u ph???i ch???a ??t nh???t 1 ch??? th?????ng, 1 ch??? hoa, 1 ch??? s??? v?? 1 k?? t??? ????ng bi???t thu???c !@#$%^&*()_-";
                  }
                  setErrorMessage((prev) => ({ ...prev, password: message }));
                  setUser((prev) => ({ ...prev, password: value }));
                }}
                error={!!errorMessage.password}
                helperText={errorMessage.password}
              />
            </div>
            <div className="mt-6 w-full md:w-1/2 md:ml-4">
              <p className="mb-2 text-slate-600 font-semibold">
                X??c nh???n m???t kh???u <span className="text-red-500">*</span>
              </p>
              <TextField
                size="small"
                type="password"
                placeholder="Nh???p L???i m???t kh???u"
                fullWidth
                value={user?.passwordConfirm || ""}
                onChange={(e) => {
                  let value = e.target.value;
                  let message = "";
                  if (value !== user?.password) {
                    message = "M???t kh???u x??c nh???n kh??ng kh???p";
                  }
                  setErrorMessage((prev) => ({
                    ...prev,
                    passwordConfirm: message,
                  }));
                  setUser((prev) => ({ ...prev, passwordConfirm: value }));
                }}
                error={!!errorMessage.passwordConfirm}
                helperText={errorMessage.passwordConfirm}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4 mt-8">
          <Button onClick={onClose}>H???y</Button>
          <Button
            variant="contained"
            disabled={!isValid}
            startIcon={isUpdate > 0 ? <Save /> : <Add />}
            onClick={hanldeSubmit}
          >
            {isUpdate > 0 ? "S???a" : "Th??m"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default EditDialog;
