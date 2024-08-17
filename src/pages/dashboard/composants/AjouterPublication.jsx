import { Stack, TextField, Button } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'


export default function AjouterPublication() {
    const user = JSON.parse(localStorage.getItem('utilisateur'))

    const { 
        handleSubmit, 
        register,
        reset, 
        formState: { errors } 
    } = useForm()

    const useQuery = useQueryClient()

    const mutation = useMutation({
        mutationFn: (publi) => {
            return axios.post('https://render-json-server-cqh4.onrender.com/publications', publi)
            // return axios.post('http://localhost:3000/publications', publi)
        },
        onError: (error) => {
            toast.error('Une erreur est survenue')
        },
        onSuccess: () => {
            reset()

            useQuery.invalidateQueries('publications')

            toast.success('Publication ajoutée avec succès')
        }

    })

    const onSubmit = (data) => {
        const publication = {
            ...data,
            idUtilisateur: user.id,
            datePublication: new Date(),
            likePublication: 0,
            auteur: user.nomUtilisateur,
        }
        mutation.mutate(publication)
    }

    return (
        <Stack width={'60%'} margin='auto'>
            <h1 style={{
                    marginTop: 20
                }}
                >Ajouter une publication
            </h1>
            <form 
                style={{
                    marginTop: 20
                }}

                onSubmit = { handleSubmit(onSubmit) }
            >
                <Stack gap={2}>            
                    <TextField
                        id='filled-basic'
                        label='Inserer votre publication'
                        variant='outlined'
                        fullWidth
                        size='small'
                        type='text'
                        multiline
                        rows={4}
                        {...register('textePublication', {
                            required: 'Veuillez saisir un texte',
                            minLength: { 
                                value: 10,
                                message: 'Veuillez saisir un texte de plus de 10 caractères' 
                            }
                        })}
                        error={!!errors.textePublication}
                        helperText={errors.textePublication?.message}
                    />
                    <TextField
                        id='filled-basic'
                        label="Saisir l'url de votre image"
                        variant='outlined'
                        fullWidth
                        size='small'
                        type='text'
                        {...register('imagePublication', {
                            required: 'Veuillez saisir une url',
                            pattern: {
                                value: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
                                message: 'Veuillez saisir une url valide'                
                            }                            
                        })}                        
                        error={!!errors.imagePublication}
                        helperText={errors.imagePublication?.message}
                    />
                    <Button variant='contained' type='submit'>Publier</Button>
                </Stack>
            </form>
        </Stack>
    )
}
