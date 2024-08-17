import React from 'react'
import { Box, Stack, Typography, TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Inscription() {
  const navigate = useNavigate()
  const { 
    handleSubmit, 
    register, 
    formState: { errors } 
  } = useForm()
  
  const onSubmit = (data) => {
    if (data.motDePasse !== data.motDePasseConfirmation) {
      toast.error('Les mots de passe ne correspondent pas');
    } else {
      // Vérification si l'email existe déjà
      axios 
        .get(`https://render-json-server-cqh4.onrender.com/utilisateurs?mailUtilisateur=${data.mailUtilisateur}`)
        // .get(`http://localhost:3000/utilisateurs?mailUtilisateur=${data.mailUtilisateur}`)
        .then((res) => {
          if (res.data.length > 0) {
            toast.error('Cet email est déjà utilisé');
          } else {
            // Création du nouvel utilisateur
            axios
              .post('https://render-json-server-cqh4.onrender.com/utilisateurs', {
              // .post('http://localhost:3000/utilisateurs', {
                nomUtilisateur: data.nomUtilisateur,
                mailUtilisateur: data.mailUtilisateur,
                motDePasse: data.motDePasse,
              })
              .then((response) => {
                if (response.status === 201) {
                  toast.success('Inscription réussie')
                  navigate('/connexion')
                } else {
                  toast.error("Une erreur s'est produite lors de l'inscription")
                }
              })
              .catch((error) => {
                toast.error("Erreur lors de l'inscription : " + error.message)
              })
          }
        })
        .catch((error) => {
          toast.error("Erreur lors de la vérification de l'email : " + error.message)
        })
    }
  }

  return (
    <Stack 
      alignItems={'center'} 
      justifyContent={'center'} 
      width={'100%'} 
      height={'100vh'} 
      backgroundColor={'#f5f5f5'}
    >
      <Box 
        width={400} 
        sx={{
          backgroundColor: '#ffffff',
          padding: 3,
        }}
      >
        <Typography variant="h5">Inscription</Typography>

        <form 
          style={{ marginTop: 4 }} 
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack direction={'column'} gap={2}>
            <TextField 
              id='filled-basic-1' 
              label='Veuillez saisir votre nom'
              variant='outlined'
              fullWidth
              size='small'
              {...register('nomUtilisateur', { 
                required: 'Veuillez saisir un nom', 
                minLength: { 
                  value: 5, 
                  message: 'Veuillez saisir un nom de plus de 5 caractères '
                } 
              })}
              error={!!errors.nomUtilisateur}
              helperText={errors.nomUtilisateur?.message}
            />

            <TextField 
              id='filled-basic-2'
              label='Veuillez saisir votre adresse email'
              variant='outlined'
              fullWidth
              size='small'
              type='email'
              {...register('mailUtilisateur', { 
                required: 'Veuillez saisir une adresse email', 
                minLength: { 
                  value: 5, 
                  message: 'Veuillez saisir un email de plus de 5 caractères ',
                },
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Veuillez saisir une adresse email valide'
                }
              })}
              error={!!errors.mailUtilisateur}
              helperText={errors.mailUtilisateur?.message}
            />

            <TextField 
              id='filled-basic-3'
              label='Veuillez saisir un mot de passe'
              variant='outlined'
              fullWidth
              size='small'
              type='password'
              {...register('motDePasse', { 
                required: 'Veuillez saisir un mot de passe', 
                minLength: { 
                  value: 6, 
                  message: 'Veuillez saisir un mot de passe de plus de 6 caractères'
                }
              })}
              error={!!errors.motDePasse}
              helperText={errors.motDePasse?.message}
            />

            <TextField 
              id='filled-basic-4'
              label='Veuillez confirmer votre mot de passe'
              variant='outlined'
              fullWidth
              size='small'
              type='password'
              {...register('motDePasseConfirmation', {
                required: 'Veuillez confirmer votre mot de passe',
                minLength: {
                  value: 6,
                  message: 'Veuillez confirmer votre mot de passe de plus de 6 caractères'
                }
              })}
              error={!!errors.motDePasseConfirmation}
              helperText={errors.motDePasseConfirmation?.message}
            />
          </Stack>
          
          <Button 
            variant="contained" 
            sx={{ marginTop: 2 }} 
            type="submit"
          >
            Inscription
          </Button>        
        </form>
      </Box>
    </Stack>
  )
}
