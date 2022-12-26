import { Box, Button, Stepper, Step, StepLabel, Typography, LinearProgress } from '@mui/material'
import { useEffect } from "react";
import { useState, Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks/hooks';
import { resetCLient, resetCart } from "../../store/client/clientSlice";

const steps = ['Atendiendo su pedido', 'Preparando su pedido', 'El repartidor está yendo a recoger su pedido', 'El repartidor está en camino al punto de entrega', 'Pedido entregado, esperamos que lo disfrute'];

export const StepperTracing = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    dispatch(resetCart())
  }, [])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    dispatch(resetCLient())
    navigate('/home')
  }

  return (
    <Box
      marginTop={3}
      marginBottom={0.2}
    >
      <Stepper 
        activeStep={activeStep} 
        alternativeLabel
      >
        {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};        
            return (
              <Step key={label} {...stepProps} >
                <StepLabel>
                  {activeStep === index 
                    ? <LinearProgress /> 
                    : index < activeStep
                      ? <LinearProgress variant="determinate" value={100} />
                      : <LinearProgress variant="determinate" value={0} />
                  }
                </StepLabel>
              </Step>
            );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Gracias por preferirnos - Realice pronto un nuevo pedido
          </Typography>
          <Box 
            display='flex'
            flexDirection= 'row'
            sx={{ pt: 2 }}
          >
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </Fragment>
      ) : (
        <Fragment>
          <Typography 
            fontSize={{xs: 16, md: 22}}
            sx={{ mt: 2, mb: 1 }}
          >
            {steps[activeStep]}
          </Typography>

          <Box
            display='flex'
            flexDirection='row' 
            sx={{  pt: 2 }}
          >
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Fragment>
      )}   
    </Box>
  )
}