

function formatCurrentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const monthIndex = currentDate.getMonth();
    const year = currentDate.getFullYear();
  
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
   
    let dayWithSuffix;
    switch (day) {
      case 1:
      case 21:
      case 31:
        dayWithSuffix = day + 'st';
        break;
      case 2:
      case 22:
        dayWithSuffix = day + 'nd';
        break;
      case 3:
      case 23:
        dayWithSuffix = day + 'rd';
        break;
      default:
        dayWithSuffix = day + 'th';
    }
  
    const formattedDate = `${dayWithSuffix} ${months[monthIndex]}, ${year}`;
    return formattedDate;
  }
  
  export { formatCurrentDate };
  