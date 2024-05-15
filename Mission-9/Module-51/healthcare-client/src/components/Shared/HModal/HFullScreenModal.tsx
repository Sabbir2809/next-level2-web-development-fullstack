import CloseIcon from "@mui/icons-material/Close";
import { DialogContent, DialogTitle, SxProps } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
import { BootstrapDialog } from "./HModal";

// type
type TModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
  sx?: SxProps;
};

// Transition
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HFullScreenModal = ({ open = false, setOpen, title = "", children, sx }: TModalProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <BootstrapDialog
      fullScreen
      onClose={handleClose}
      open={open}
      sx={{ ...sx }}
      TransitionComponent={Transition}>
      <DialogTitle sx={{ color: "primary.main", background: "#f4f7fe" }}>{title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}>
        <CloseIcon />
      </IconButton>
      <DialogContent>{children}</DialogContent>
    </BootstrapDialog>
  );
};

export default HFullScreenModal;
