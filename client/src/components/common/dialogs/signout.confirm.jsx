import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import React from 'react'

function ConfirmSignOut() {
  return (
    <AlertDialog>
   
    <AlertDialogContent>
        <AlertDialogHeader>
        <AlertDialogTitle>You will be logged out from your account</AlertDialogTitle>
        <AlertDialogDescription>
            Are you sure you want to logout?
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmSignOut;