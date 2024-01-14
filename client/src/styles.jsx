import theme from "./theme";

export const styles = {
    appBar:{
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      title:{
        color: 'rgba(0,183,255, 1)',
        fontSize: {
          xs: '2rem',
          sm: '3rem',
          md: '4rem',
          lg: '5rem',
        },
      },
      headingImage:{
        marginLeft: '15px',
        width: '80px',
        height: '80px',
        marginTop: '10px',
      },
      MainContainer:{
        [theme.breakpoints.down('sm')]: 
        {
          flexDirection:'column-reverse'
        }
      },
      
};

export const PostStyles = {
    cardStyle:{ 
        minWidth: 300, 
        backgroundColor: 'white',
        borderRadius:'15px'
      },
      postStyle1:{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop:'10px',
        paddingLeft:'15px'
    }
}
