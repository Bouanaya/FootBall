"use client"

import React, { useState, useEffect } from 'react'
import PlayersForm from '../../components/forms/PlayerForm'
import * as  playersService  from '../../app/api/playersService'
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import Input from '../ui/input'
import Button from '../ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Label } from '@radix-ui/react-dropdown-menu'

export default function PlayersTable() {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  
  const [formData, setFormData] = useState({
      fullName: "",
      cin: "",
      nationality: "Morocco",
      phone: "",
      guardianName: "",
      guardianPhone: "",
      address: "",
      position: "",
      preferredFoot: "right",
      teamName: "",
      jerseyNumber: "",
      birthDate: "",
      joinDate: new Date(),
      height: "",
      weight: "",
      membershipFee: 0,
      membershipPaid: false,
      medicalNotes: "",
      imageUrl: "",
  })

  // Charger les joueurs avec écoute en temps réel
  useEffect(() => {
    setLoading(true)
    
    // Écouter les changements en temps réel
    const unsubscribe = playersService.onPlayersChange((playersData) => {
      setPlayers(playersData)
      setLoading(false)
    })

    // Nettoyage de l'écoute
    return () => unsubscribe()
  }, [])

  // Ajouter un joueur
const handleAddPlayer = async (e) => {
 
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const newPlayer = await playersService.addPlayer({
      ...formData,
   
    });

    setShowAddForm(false);
    setFormData({
      fullName: "",
      cin: "",
      nationality: "Morocco",
      phone: "",
      guardianName: "",
      guardianPhone: "",
      address: "",
      position: "",
      preferredFoot: "right",
      teamName: "",
      jerseyNumber: "",
      birthDate: "",
      joinDate: new Date(),
      height: "",
      weight: "",
      membershipFee: 0,
      membershipPaid: false,
      medicalNotes: "",
      imageUrl: "",
    });

    console.log('Joueur ajouté avec succès:', newPlayer);
  } catch (error) {
    setError('Erreur lors de l\'ajout du joueur');
    console.error(error);
  } finally {
    setLoading(false);
  }
}


  // Modifier un joueur
  const handleUpdatePlayer = async (playerId, updatedData) => {
    setLoading(true)
    setError(null)
    
    try {
      await playersService.updatePlayer(playerId, updatedData)
      console.log('Joueur modifié avec succès')
    } catch (error) {
      setError('Erreur lors de la modification du joueur')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Supprimer un joueur
  const handleDeletePlayer = async (playerId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce joueur ?')) {
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      await playersService.deletePlayer(playerId)
      console.log('Joueur supprimé avec succès')
    } catch (error) {
      setError('Erreur lors de la suppression du joueur')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Filtrer les joueurs
  const filteredPlayers = players.filter(player =>
    player.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.team?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.nationality?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* En-tête */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">⚽ Gestion des Joueurs</h1>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              disabled={loading}
            >
              + Ajouter un joueur
            </Button>
          </div>
          
          {/* Barre de recherche */}
          <Input
            type="text"
            placeholder="Rechercher un joueur..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-600">Total Joueurs</h3>
            <p className="text-3xl font-bold text-blue-600">{players.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-600">Note Moyenne</h3>
            {/* <p className="text-3xl font-bold text-green-600">
              {players.length > 0 ? 
                Math.round(players.reduce((acc, p) => acc + p.rating, 0) / players.length) : 0
              }
            </p> */}
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-600">Total Buts</h3>
            {/* <p className="text-3xl font-bold text-orange-600">
              {players.reduce((acc, p) => acc + (p.goals || 0), 0)}
            </p> */}
          </div>
        </div>

        {/* Liste des joueurs */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="text-xl text-gray-600">Chargement...</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joueur</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">position</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">membershipFee</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">joinDate</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPlayers.map((player) => (
                    <tr key={player.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img 
                            className="h-10 w-10 rounded-full object-cover" 
                            src={player.imageUrl || '/default-avatar.png'} 
                            alt={player.fullName}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{player.cin}</div>
                            <div className="text-sm text-gray-500">{player.nationality}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          {player.joinDate}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{player.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-green-600">
                        {player.membershipFee}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                        {player.membershipPaid}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        {/* <button 
                          onClick={() => handleDeletePlayer(player.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          🗑️
                        </button> */}
 <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
      
   
        <DropdownMenuItem onClick={() => handleUpdatePlayer(player.id)}>
    
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen-line-icon lucide-pen-line text-primary"><path d="M13 21h8"/><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg>
                Update 
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDeletePlayer(player.id)} className="text-red-600">
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash text-red-500"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        Delate
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredPlayers.length === 0 && !loading && (
                <div className="p-12 text-center text-gray-500">
                  Aucun joueur trouvé
                </div>
              )}
            </div>
          )}
        </div>
        

        {/* Formulaire d'ajout */}
   {showAddForm && (
  <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50   ">
   <PlayersForm addPlayer={handleAddPlayer}/>
  </div>
)}

      </div>
    </div>
  )
}