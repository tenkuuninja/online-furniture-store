import {
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Link } from "react-router-dom";
import CartInfo from "./CartInfo";

const Step2 = ({
  customer,
  setCustomer,
  errorMessage,
  setErrorMessage,
  goNextStep,
}) => {
  let isValid =
    customer?.name?.length > 0 &&
    customer?.gender?.length > 0 &&
    /^[a-z0-9-]+$/g.test(customer?.phonename) &&
    customer?.address?.length > 0;

  return (
    <div className="p-4 sm:p-8">
      <div className="flex">
        <div className="inline-block w-full lg:w-[50%] xl:w-[60%]">
          <div className="mt-0">
            <p className="mb-2 text-slate-700 font-semibold">
              Họ và tên <span className="text-red-500">*</span>
            </p>
            <TextField
              size="small"
              placeholder="Nhập tên người nhận hàng"
              fullWidth
              value={customer?.name || ""}
              onChange={(e) => {
                let value = e.target.value;
                let message = "";
                if (!value) {
                  message = "Tên người nhận không được trống";
                }
                setErrorMessage((prev) => ({ ...prev, name: message }));
                setCustomer((prev) => ({ ...prev, name: value }));
              }}
              error={!!errorMessage.name}
              helperText={errorMessage.name}
            />
          </div>

          <div className="mt-6">
            <p className="mb-2 text-slate-700 font-semibold">
              Giới tính <span className="text-red-500">*</span>
            </p>
            <RadioGroup
              row
              onChange={(e) => {
                let value = e.target.value;
                setCustomer((prev) => ({ ...prev, gender: value }));
              }}
            >
              <FormControlLabel value="M" control={<Radio />} label="Nam" />
              <FormControlLabel value="F" control={<Radio />} label="Nữ" />
            </RadioGroup>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-slate-700 font-semibold">
              Điện thoại di động <span className="text-red-500">*</span>
            </p>
            <TextField
              size="small"
              placeholder="Nhập số điện thoại"
              fullWidth
              value={customer?.phone || ""}
              onChange={(e) => {
                let value = e.target.value;
                let message = "";
                if (!value) {
                  message = "Số điện thoại không được trống";
                } else if (!/^(84|0[3|5|7|8|9])+([0-9]{8})\b$/g.test(value)) {
                  message = "Số điện thoại chưa đúng định dạng";
                }
                setErrorMessage((prev) => ({ ...prev, phone: message }));
                setCustomer((prev) => ({ ...prev, phone: value }));
              }}
              error={!!errorMessage.phone}
              helperText={errorMessage.phone}
            />
          </div>

          <div className="mt-6">
            <p className="mb-2 text-slate-700 font-semibold">
              Địa chỉ <span className="text-red-500">*</span>
            </p>
            <TextField
              size="small"
              placeholder="Nhập địa chỉ"
              fullWidth
              value={customer?.address || ""}
              onChange={(e) => {
                let value = e.target.value;
                let message = "";
                if (!value) {
                  message = "Địa chỉ không được trống";
                }
                setErrorMessage((prev) => ({ ...prev, address: message }));
                setCustomer((prev) => ({ ...prev, address: value }));
              }}
              error={!!errorMessage.address}
              helperText={errorMessage.address}
            />
          </div>

          <div className="mt-6">
            <p className="mb-2 text-slate-700 font-semibold">
              Ghi chú <span className="text-red-500"></span>
            </p>
            <TextField
              size="small"
              placeholder="Lời nhắn với chủ xốp"
              fullWidth
              multiline
              minRows={4}
              value={customer?.note || ""}
              onChange={(e) => {
                let value = e.target.value;
                setCustomer((prev) => ({ ...prev, note: value }));
              }}
              error={!!errorMessage.note}
              helperText={errorMessage.note}
            />
          </div>
        </div>
        <div className="hidden lg:block flex-grow pl-8 mt-2">
          <CartInfo />
        </div>
      </div>
      <div className="flex justify-end items-center gap-4 mt-8">
        <Link to="/gio-hang">
          <Button>Về giỏ hàng</Button>
        </Link>
        <Button disabled={!isValid} variant="contained" onClick={goNextStep}>
          Đặt hàng
        </Button>
      </div>
    </div>
  );
};

export default Step2;
