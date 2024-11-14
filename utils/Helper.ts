export function validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePassword(password :  string) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

 export  function formatDateFromString(dateString: string): string {
    // Ensure the input is in the expected format
    if (!/^\d{8}$/.test(dateString)) {
      throw new Error("Invalid date format. Expected yyyymmdd.");
    }
  
    // Parse the date string
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
  
    // Format as mm-dd-yyyy
    return `${month}-${day}-${year}`;
  }
  

  
  