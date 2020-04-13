import React, {useContext, useRef, useState, useEffect} from "react";
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

function HomeView(props) {
  const {myboard, inform, moveFirstEnable, moveBackEnable,
    moveNextEnable, moveLastEnable} = useContext(BoardContext);
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(ref.current.clientWidth);
  }, []);

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
           display="flex" flexDirection="column" alignContent="stretch" width={width}>

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



        <Box ref={ref} mx="auto" my={2} >

          <Box display="flex" flexDirection="row" alignContent="space-evenly" height={height/3}>

            <Box width={1/3} borderTop={1} borderLeft={1}
                 display="flex" flexDirection="row" alignContent="stretch"
                 >
              <Button fullWidth id="00" onClick={onClick}>
                {myboard.gameboard[0][0]}
              </Button>
            </Box>

            <Box width={1/3} borderTop={1} borderLeft={1}
                 display="flex" flexDirection="row" alignContent="stretch">
              <Button fullWidth id="01" onClick={onClick}>
                {myboard.gameboard[0][1]}
              </Button>
            </Box>

            <Box width={1/3} borderTop={1} borderLeft={1} borderRight={1}
                 display="flex" flexDirection="row" alignContent="stretch">
              <Button fullWidth id="02" onClick={onClick}>
                {myboard.gameboard[0][2]}
              </Button>
            </Box>

          </Box>

          <Box display="flex" flexDirection="row" alignContent="space-evenly" height={height/3}>

            <Box width={1/3} borderTop={1} borderLeft={1}
                 display="flex" flexDirection="row" alignContent="stretch">
              <Button fullWidth id="10" onClick={onClick}>
                {myboard.gameboard[1][0]}
              </Button>
            </Box>

            <Box width={1/3} borderTop={1} borderLeft={1}
                 display="flex" flexDirection="row" alignContent="stretch">
              <Button fullWidth id="11" onClick={onClick}>
                {myboard.gameboard[1][1]}
              </Button>
            </Box>

            <Box width={1/3} borderTop={1} borderLeft={1} borderRight={1}
                 display="flex" flexDirection="row" alignContent="stretch">
              <Button fullWidth id="12" onClick={onClick}>
                {myboard.gameboard[1][2]}
              </Button>
            </Box>

          </Box>

          <Box display="flex" flexDirection="row" alignContent="space-evenly" height={height/3}>

            <Box width={1/3} borderTop={1} borderLeft={1} borderBottom={1}
                 display="flex" flexDirection="row" alignContent="stretch">
              <Button fullWidth id="20" onClick={onClick}>
                {myboard.gameboard[2][0]}
              </Button>
            </Box>

            <Box width={1/3} borderTop={1} borderLeft={1} borderBottom={1}
                 display="flex" flexDirection="row" alignContent="stretch">
              <Button fullWidth id="21" onClick={onClick}>
                {myboard.gameboard[2][1]}
              </Button>
            </Box>

            <Box width={1/3} border={1}
                 display="flex" flexDirection="row" alignContent="stretch">
              <Button fullWidth id="22" onClick={onClick}>
                {myboard.gameboard[2][2]}
              </Button>
            </Box>

          </Box>

        </Box>

        <Box display="flex" flexDirection="row" justifyContent="space-evenly" my={1}>

          <IconButton color="secondary"
                      disabled={!!moveFirstEnable()} onClick={onMove} id="move-first"
          >
            {<FastRewind fontSize="large"/>}
          </IconButton>

          <IconButton color="secondary"
                      disabled={!moveBackEnable()} onClick={onMove} id="move-back"
                      >
            {<ArrowLeft fontSize="large"/>}
          </IconButton>

          <IconButton color="secondary"
                      disabled={!moveNextEnable()} onClick={onMove} id="move-next"
          >
            {<ArrowRight fontSize="large"/>}
          </IconButton>


          <IconButton color="secondary"
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