// src/components/OnboardingDialog.jsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  Star,
  Apps,
  Search,
  Schedule,
  WbSunny,
  StickyNote2,
  ArrowForward,
  ArrowBack,
} from '@mui/icons-material';

const OnboardingDialog = ({ open, onClose, onComplete }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [userName, setUserName] = useState('');

  const steps = [
    {
      title: 'Bem-vindo ao TabFlex!',
      content: (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 600 }}>
            🚀 TabFlex Extension
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
            Transforme sua nova aba em um hub de produtividade personalizado com widgets inteligentes e acesso rápido aos seus sites favoritos.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <Apps />
            </Avatar>
            <Avatar sx={{ bgcolor: 'success.main' }}>
              <Search />
            </Avatar>
            <Avatar sx={{ bgcolor: 'warning.main' }}>
              <Star />
            </Avatar>
          </Box>
        </Box>
      ),
    },
    {
      title: 'Widgets Inteligentes',
      content: (
        <Box sx={{ py: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
            Widgets que funcionam para você
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Card variant="outlined">
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <Schedule />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Relógio & Localização
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hora atual e sua localização sempre visíveis
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            
            <Card variant="outlined">
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.main' }}>
                  <WbSunny />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Clima em Tempo Real
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Temperatura e condições climáticas atualizadas
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'success.main' }}>
                  <StickyNote2 />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Notas Rápidas
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Anote lembretes importantes e tarefas do dia
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      ),
    },
    {
      title: 'Grid de Aplicativos',
      content: (
        <Box sx={{ py: 2, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Acesso rápido aos seus sites favoritos
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, maxWidth: 300, mx: 'auto', mb: 3 }}>
            {['YouTube', 'Gmail', 'WhatsApp', 'Netflix', 'Spotify', 'Instagram', 'Amazon', 'Facebook'].map((app, index) => (
              <Card key={app} variant="outlined" sx={{ p: 1, textAlign: 'center', minHeight: 60 }}>
                <Avatar sx={{ width: 24, height: 24, mx: 'auto', mb: 0.5, fontSize: '0.7rem' }}>
                  {app.charAt(0)}
                </Avatar>
                <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>
                  {app}
                </Typography>
              </Card>
            ))}
          </Box>
          <Typography variant="body2" color="text.secondary">
            Clique no botão + para adicionar seus sites preferidos
          </Typography>
        </Box>
      ),
    },
    {
      title: 'Como você gostaria de ser chamado?',
      content: (
        <Box sx={{ py: 3, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Personalize sua experiência
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Digite seu nome para receber saudações personalizadas baseadas na hora do dia.
          </Typography>
          <TextField
            fullWidth
            label="Seu nome"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Como gostaria de ser chamado?"
            variant="outlined"
            sx={{ maxWidth: 300, mx: 'auto' }}
            autoFocus
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
            Exemplo: "Bom dia, {userName || 'João'} 👋"
          </Typography>
        </Box>
      ),
    },
  ];

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Última etapa - finalizar onboarding
      const finalUserName = userName.trim() || 'Usuário';
      localStorage.setItem('tabflex-user-name', finalUserName);
      localStorage.setItem('tabflex-onboarding-completed', 'true');
      onComplete(finalUserName);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isLastStep = activeStep === steps.length - 1;
  const isFirstStep = activeStep === 0;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'visible',
        },
      }}
    >
      <DialogContent sx={{ px: 4, py: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel />
            </Step>
          ))}
        </Stepper>

        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 600 }}>
          {steps[activeStep].title}
        </Typography>

        {steps[activeStep].content}
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 3, justifyContent: 'space-between' }}>
        <Button
          onClick={handleBack}
          disabled={isFirstStep}
          startIcon={<ArrowBack />}
          variant="outlined"
        >
          Voltar
        </Button>

        <Button
          onClick={handleNext}
          variant="contained"
          endIcon={isLastStep ? null : <ArrowForward />}
          disabled={isLastStep && !userName.trim()}
          sx={{ minWidth: 120 }}
        >
          {isLastStep ? 'Começar!' : 'Próximo'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OnboardingDialog;