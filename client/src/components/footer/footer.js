import { CONTRAST_COLOR1, CONTRAST_COLOR2, DARK_COLOR1, DARK_COLOR2, PRIMARY_COLOR, SECONDARY_COLOR } from "../../constants/colors"

export default function Footer(){


    const upper_Style={
        display:'flex',
        flexDirection:"column",
        alignItems:'center',
        JustifyContent:'center',
        width:'75vw',
        height:'auto',
        marginBottom:'0px',
        background:SECONDARY_COLOR,
        position:'fixed',
        bottom:'5px',
        borderRadius:'10px 10px',
        color:'#FEFEFE',
        fontFace:'inter',
        fontWeight:'500px,bold',
        fontSize:'18px',
    }

    const lower_style={
        display:'flex',
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        alignItems:'center',
        // margin:'0 20px',
        // :'0 30px',
        // textDecoration:'none',
    }

    function linkedinHandler(e){
        e.preventDefault();


    }
    return(
        <div style={upper_Style}>
            Made By:
            <div style={lower_style}>
                <a href ='https://linkedin.com/in/mehul-pandey-1750051b3/' style={{textDecoration:'none',color:'inherit'}} target = "_blank" rel = "noopener noreferrer">
                    <div style={{marginLeft:'15px',marginRight:'0px'}}>Linkedin</div>
                </a>
                <div>Mehul Pandey</div>
                <a href ='https://github.com/mehulp1612' style={{textDecoration:'none',color:'inherit'}} target = "_blank" rel = "noopener noreferrer">
                    <div style={{marginRight:'15px'}}>Github</div>
                </a>
            </div>
        </div>
    )
}