import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/services/auth.context";
import React from "react";
import { useNavigate } from "react-router-dom";

function ConfirmSignOut({ isOpen, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleCancel = () => {
    onClose();
  };

  const confirmSignout = () => {
    logout();
    navigate("/");
  };
  return (
    <AlertDialog open={isOpen} onClose={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            You will be logged out from your account
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to logout?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirmSignout}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmSignOut;
