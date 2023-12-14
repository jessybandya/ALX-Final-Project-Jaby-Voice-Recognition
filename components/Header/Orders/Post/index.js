import { AppBar, Dialog, IconButton, Snackbar, Toolbar, Typography } from '@mui/material';
import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Slide } from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Post({ orderId, orders, status, total }) {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState('')
  const vertical= "bottom"
  const horizontal= "right"

  const handleClick = (text) => {
    setOpen(true);
    setText(text)
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      handleClick(`Copied: ${text}`)
    });
  };

  const classes = "p-4 border-b border-blue-gray-50";

  const receiver = '+254746749307';

  const addCommasToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const sendtoWhatsapp = async () => {
    try {
      const totalPrice = addCommasToNumber(total?.toFixed(2));

      const formattedCartItems = orders?.map((item, index) => {
        const formattedPrice = parseFloat(item.price).toLocaleString('en-US', { style: 'currency', currency: 'KES' });
        const subTotal = addCommasToNumber((item.price * item.quantity)?.toFixed(2));
      
        return `*Item ${index + 1}:*\n*Name:* ${item.name}\n*Quantity:* ${item.quantity}\n*Price:* ${formattedPrice}\n*Sub-Total Price:* KES ${subTotal}\n*Link:* ${item.link}`;
      }).join('\n\n');
      
      const formattedTotalPrice = totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'KES' });
      
      const messageWithSenderDetails = `*My Orders:*\n\n${formattedCartItems}\n\n*Total Price:* KES ${formattedTotalPrice}`;
      
      const whatsAppLink = `https://api.whatsapp.com/send?phone=${receiver}&text=${encodeURIComponent(messageWithSenderDetails)}`;
      
      window.open(whatsAppLink, '_blank');
      
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error('Error sending cart items:', error,{
        position: toast.POSITION.TOP_CENTER
      });
    }
};

  return (
    <tr>
    <td className={classes}>
    {orderId} <ContentCopyIcon style={{color:'#D1D1D1',cursor:'pointer'}} onClick={() => copyToClipboard(orderID)}/>
  </td>
  <td className={classes}>
    {status}
  </td>
  <td style={{cursor:'pointer'}} className={classes}>
  <RemoveRedEyeIcon/>
</td>
<td className={classes}>
{numberWithCommas(total)}
</td>
<td className={classes}>
 <WhatsAppIcon className='cursor-pointer' onClick={sendtoWhatsapp}/>
</td>

    <Typography
    variant="small"
    color="blue-gray"
    className="font-normal"
  >
  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
  anchorOrigin={{ vertical, horizontal }}
  TransitionComponent={SlideTransition}
  >
  <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
    {text}
  </Alert>
</Snackbar>
  </Typography>
 
    </tr>
  )
}

export default Post