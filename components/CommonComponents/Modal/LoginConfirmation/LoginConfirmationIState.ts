export interface LoginConfirmationIProps {
    onClose: () => void;
    onLogin: () => void;
    showAlreadyUserError?: { [key: string]: { [key: string]: string }[] };
    user?: {
      UserId: string;
      FirstName: string;
      LastName: string;
      MiddleName: string;
      EmailAddress: string;
    };
    role?: {
      RoleId: string;
      RoleName: string;
      Description: string;
    };
    RoleError?: { [key: string]: { [key: string]: string }[] };
    policy?: {
      UserId: string;
      FirstName: string;
      LastName: string;
      MiddleName: string;
      EmailAddress: string;
    };
    policyuser?: {
      RoleId: string;
      RoleName: string;
      Description: string;
    };
    handlePolicyExistDelete?: () => void;
    handleRoleExistDelete?: () => void;
    confirmationMessage?: string;
  }
  