import React, { useEffect } from 'react'
import { Box, Stack, Typography, TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Connexion() {
  const navigate = useNavigate()
  
  useEffect( () => {
    if(localStorage.getItem('utilisateur')) {
      navigate('/')
    }
  })
  
  const { 
    handleSubmit, 
    register, 
    formState: { errors } 
  } = useForm()
  
  const onSubmit = (data) => {
    axios
        .get(`https://render-json-server-cqh4.onrender.com/utilisateurs?mailUtilisateur=${data.mailUtilisateur}&motDepasse=${data.motDePasse}`)
        // .get(`http://localhost:3000/utilisateurs?mailUtilisateur=${data.mailUtilisateur}&motDepasse=${data.motDePasse}`)
        .then (res => {
          if(res.data.length > 0) {
            localStorage.setItem('utilisateur', JSON.stringify(res.data[0]))
            navigate('/')
            toast.success('Connexion')

          } else {
            toast.error('Les identifiants sont incorrects')
          }

        })
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
        <Typography variant="h5">Connexion</Typography>

        <form 
          style={{ marginTop: 4 }} 
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack direction={'column'} gap={2}>
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
          </Stack>
          
          <Button 
            variant="contained" 
            sx={{ marginTop: 2 }} 
            type="submit"
          >
            Connexion
          </Button>
          <Typography paddingTop={2}>Voulez vous créer un compte ? {' '} <Link to='/inscription'>Cliquez ici</Link></Typography>        
        </form>
      </Box>
    </Stack>
  )
}
