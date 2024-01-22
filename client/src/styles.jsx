import theme from "./theme";

export const styles = {
    appBar:{
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '90px',
      },
      homeButton:{
        padding:'0px',
        margin:'0px',
        height: "90px"
      },
      title:{
        color: 'rgba(0,183,255, 1)',
        fontSize: {
          xs: '1rem',
          sm: '2rem',
          md: '3rem',
          lg: '3rem',
        },
      },
      loginButton:{
        justifySelf:'flex-end',
      },
      headingImage:{
        width: '150px',
        height: '150px',
        
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
