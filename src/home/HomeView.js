import React, {useContext} from "react";
import "./Home.css";
import {BoardContext} from "./HomeModel";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AddIcon from '@material-ui/icons/Add';
import ArrowLeft from "@material-ui/icons/ArrowLeft";
import ArrowRight from "@material-ui/icons/ArrowRight";
import FastForward from "@material-ui/icons/FastForward";
import FastRewind from "@material-ui/icons/FastRewind";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
const width = {xs:"90%", sm:"550px", md:"550px", lg:"550px", xl:"550px"};
const padTop = {xs:5, sm:5, md:8, lg:10, xl:11};

// const useStyles = makeStyles((theme)=>({
//   fab: {
//     position: 'absolute',
//     align: FormatAlignRight,
//     right: theme.spacing(2),
//   }
// }));

function HomeView(props) {
  // const classes = useStyles();
  const {myboard, inform, moveFirstEnable, moveBackEnable,
    moveNextEnable, moveLastEnable} = useContext(BoardContext);

  function reset() {
    props.reset()
  }

  function onClick(event) {
    props.onClick(event);
  }

  function onMove(event) {
    props.onMove(event);
  }

  return (
    <Grid container direction="row" justify="center" alignItems="center">

      <Box mt={padTop} borderRadius={5} boxShadow={3} bgcolor="white" mx={2} mb={10}
           display="flex" flexDirection="column" alignContent="stretch" width={width}
      >

        <Box display="flex" flexDirection="row" justifyContent="flex-end" mt={-2.5} pr={2}>
          <Fab color="primary" aria-label="add" onClick={reset}>
            <AddIcon />
          </Fab>
        </Box>

        <Box my={2} mx="auto" color="green">
          <Typography variant="h4">
            {inform(myboard)}
          </Typography>
        </Box>



        <div className="container mt-3">
          <div className="row d-flex flex-row justify-content-center">
            <button className="btn rounded-0 border-left border-top text-success"
                    style={{"width":"5rem", "height":"5rem"}}
                    id="00" onClick={onClick}>
              {myboard.gameboard[0][0]}
            </button>
            <button className="btn rounded-0 border-left border-top text-success"
                    style={{"width":"5rem", "height":"5rem"}}
                    id="01" onClick={onClick}>
              {myboard.gameboard[0][1]}
            </button>
            <button className="btn rounded-0 border-left border-top border-right text-success"
                    style={{"width":"5rem", "height":"5rem"}}
                    id="02" onClick={onClick}>
              {myboard.gameboard[0][2]}
            </button>
          </div>

          <div className="row d-flex flex-row justify-content-center">
            <button className="btn rounded-0 border-left border-top text-success"
                    style={{"width":"5rem", "height":"5rem"}}
                    id="10" onClick={onClick}>
              {myboard.gameboard[1][0]}
            </button>
            <button className="btn rounded-0 border-left border-top text-success"
                    style={{"width":"5rem", "height":"5rem"}}
                    id="11" onClick={onClick}>
              {myboard.gameboard[1][1]}
            </button>
            <button className="btn rounded-0 border-left border-top border-right text-success"
                    style={{"width":"5rem", "height":"5rem"}}
                    id="12" onClick={onClick}>
              {myboard.gameboard[1][2]}
            </button>
          </div>

          <div className="row d-flex flex-row justify-content-center">
            <button className="btn rounded-0 border-left border-top border-bottom text-success"
                    style={{"width":"5rem", "height":"5rem"}}
                    id="20" onClick={onClick}>
              {myboard.gameboard[2][0]}
            </button>
            <button className="btn rounded-0 border-left border-top border-bottom text-success"
                    style={{"width":"5rem", "height":"5rem"}}
                    id="21" onClick={onClick}>
              {myboard.gameboard[2][1]}
            </button>
            <button className="btn rounded-0 border-left border-top border-right border-bottom
                  text-success" style={{"width":"5rem", "height":"5rem"}}
                    id="22" onClick={onClick}>
              {myboard.gameboard[2][2]}
            </button>
          </div>

        </div>

        <Box display="flex" flexDirection="row" justifyContent="space-evenly">

          <IconButton color="secondary" startIcon={<ArrowLeft/>}
                      disabled={!!moveFirstEnable()} onClick={onMove} id="move-first"
          >
            {<FastRewind fontSize="large"/>}
          </IconButton>

          <IconButton color="secondary" startIcon={<ArrowLeft/>}
                      disabled={!moveBackEnable()} onClick={onMove} id="move-back"
                      >
            {<ArrowLeft fontSize="large"/>}
          </IconButton>

          <IconButton color="secondary" startIcon={<ArrowLeft/>}
                      disabled={!moveNextEnable()} onClick={onMove} id="move-next"
          >
            {<ArrowRight fontSize="large"/>}
          </IconButton>


          <IconButton color="secondary" startIcon={<ArrowLeft/>}
                      disabled={!!moveLastEnable()} onClick={onMove} id="move-last"
          >
            {<FastForward fontSize="large"/>}
          </IconButton>

        </Box>

      </Box>

    </Grid>
  )
}

export default HomeView;