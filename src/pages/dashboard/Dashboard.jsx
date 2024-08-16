import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './composants/Navbar'
import { Avatar, Box, Typography, Stack } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import AjouterPublication from './composants/AjouterPublication'
import axios from 'axios'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import CartePub from './composants/CartePub'

export default function Dashboard() {
  const navigate = useNavigate()

  useEffect (() => {
    if(!localStorage.getItem('utilisateur')) {
      navigate('/connexion')
    }

  }, [navigate])

  const queryClient = useQueryClient()
  const { 
    data: publications = [], 
    error, 
    isLoading 
  } = useQuery({
    queryKey : ['publications'],
    queryFn: () => axios
      .get('http://localhost:3000/publications')
      .then((res) => res.data),
      onerror : (error) => console.log(error)

  })

  if (isLoading) {
    return <div>Chargement...</div>
  }

  if (error) {
    return <div>Erreur de chargement des publications.</div>;
  }

  let publiTrier = publications.sort((a,b) => {
    return new Date(b.datePublication) - new Date(a.datePublication)
  })


  return (
    <Box bgcolor={'#f5f5f5'}>
      <Navbar />
      <AjouterPublication />
      <Box width={'60%'} margin={'auto'} marginTop={2}>
        {publications && publiTrier.map((publication) => ( 
          <CartePub publication={publication}></CartePub>
        ))}
      </Box>
    </Box>
  )
}
