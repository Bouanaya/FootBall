"use client";

import React, { useState, useEffect } from "react";
import PlayersForm from "../../components/forms/PlayerForm";
import * as playersService from "../../app/api/playersService";
import { MoreHorizontal } from "lucide-react";
import CartPlayer from "../../components/Carts/CartPlayer";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Input from "../ui/input";
import Button from "../ui/button";
import { getPlayers } from "../../app/api/service/getPlayers";

export default function PlayersTable() {
  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
  ];

  function getColorFromName(name) {
    if (!name) return "bg-gray-500";
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [playerToEdit, setPlayerToEdit] = useState(null);
  const [update, setUpdate] = useState(false);

  const initialForm = {
    // Personal Information
    fullName: "",
    cin: "",
    nationality: "Morocco",
    phone: "",
    birthDate: null,
    address: "",

    // Guardian Information
    guardianName: "",
    guardianPhone: "",

    // Football Information
    position: "",
    preferredFoot: "right",
    teamName: "",
    jerseyNumber: "",
    height: "",
    weight: "",

    // Financial Information
    membershipFee: 0,
    membershipPaid: false,

    // Additional Information
    medicalNotes: "",
    imageUrl: "",
    joinDate: new Date(),

    // Firebase metadata
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  };
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    cin: "",
    nationality: "Morocco",
    phone: "",
    birthDate: null,
    address: "",

    // Guardian Information
    guardianName: "",
    guardianPhone: "",

    // Football Information
    position: "",
    preferredFoot: "right",
    teamName: "",
    jerseyNumber: "",
    height: "",
    weight: "",

    // Financial Information
    membershipFee: 0,
    membershipPaid: false,

    // Additional Information
    medicalNotes: "",
    imageUrl: "",
    joinDate: new Date(),

    // Firebase metadata
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  });
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [card, setCard] = useState(false);

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    setCard(true);
  };

  // Charger les joueurs avec écoute en temps réel
  useEffect(() => {
    setLoading(true);

    // Écouter les changements en temps réel
    const unsubscribe = playersService.onPlayersChange((playersData) => {
      setPlayers(playersData);
      setLoading(false);
    });

    // Nettoyage de l'écoute
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      const data = await getPlayers();
      setPlayers(data);
      setLoading(false);
    };

    fetchPlayers();
  }, []);

  const handleUpdatePlayer = (player) => {
    console.log(player);

    setPlayerToEdit(player);
    setShowAddForm(true);
  };

  // Supprimer un joueur
  const handleDeletePlayer = async (playerId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce joueur ?")) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await playersService.deletePlayer(playerId);
      console.log("Joueur supprimé avec succès");
    } catch (error) {
      setError("Erreur lors de la suppression du joueur");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les joueurs
  const filteredPlayers = players.filter((player) =>
    player.personal?.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="  mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-primary">
              {" "}
              Gestion des Joueurs
            </h1>
            <Button
              onClick={() => {
                setFormData(initialForm);
                setShowAddForm(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              disabled={loading}
            >
              + Ajouter un joueur
            </Button>
          </div>

          {/* Barre de recherche */}

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-600 ">
              Total Joueurs
            </h3>
            <p className="text-3xl font-bold text-blue-600">{players.length}</p>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <Input
            type="text"
            placeholder="Rechercher un joueur..."
            className="w-1/2 mb-4 flex justify-end px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Liste des joueurs */}
        <div className="bg-white shadow max-h-80 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center flex justify-center items-center">
              <div className="spinner  "></div>
            </div>
          ) : (
            <div className="overflow-x-auto mx-h-80 ">
              <table className="w-full">
                <thead className="bg-primary">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">
                      Joueur
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">
                      phone
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">
                      position
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase">
                      foot
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-white uppercase">
                      body
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-white uppercase">
                      joinDate
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase">
                      guardianPhone
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100  ">
                  {filteredPlayers.map((player) => (
                    <tr key={player.id} className="bg-white cursor-pointer">
                      <td
                        className="px-4 py-3 whitespace-nowrap"
                        onClick={() => handlePlayerClick(player)}
                      >
                        <div className="flex items-center">
                          {player?.additional?.imageUrl ? (
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={player.additional.imageUrl}
                              alt={player?.personal?.fullName || "Player"}
                            />
                          ) : (
                            <span
                              className={`w-10 h-10 rounded-full  flex items-center justify-center text-white font-bold ${getColorFromName(
                                player?.personal?.fullName
                              )}`}
                            >
                              {player?.personal?.fullName
                                .charAt(0)
                                .toUpperCase()}
                            </span>
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium ">
                              {player?.personal?.fullName.toUpperCase()}
                            </div>
                            <div className="text-sm text-green-500">
                              {player?.personal?.nationality}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-left">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          {player?.personal?.phone}
                        </span>
                      </td>
                      <td className="px-4 py-3  space-x-1 items-center  whitespace-nowrap text-sm text-green-400">
                        <span className="text-primary">
                          {player?.football?.position}
                        </span>
                        <span className="text-green-500 font-bold">++</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {player?.football?.preferredFoot === "left" ? (
                          <div className="bg-blue-100 p-1 rounded-xl   flex items-center justify-center">
                            <img
                              src="https://www.futbin.com/design2/img/static/filters/foot-left.svg"
                              alt=""
                              className="w-6 h-6"
                            />
                          </div>
                        ) : player?.football?.preferredFoot === "right" ? (
                          <div className="bg-green-100 p-1 rounded-xl   flex items-center justify-center">
                            <img
                              src="https://www.futbin.com/design2/img/static/filters/foot-right.svg"
                              alt=""
                              className="w-6 h-6"
                            />
                          </div>
                        ) : (
                          <div className="bg-yellow-100 p-1 rounded-xl w-6 h-6 flex items-center justify-center">
                            Both
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center text-sm flex flex-col">
                        <span className="text-sm">
                          {player.football?.height || "-"}cm{" "}
                        </span>
                        <span>{player.football?.weight || "-"}kg</span>
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm  ">
                        {player?.personal?.birthDate
                          ? new Date(
                              player.personal.birthDate
                            ).toLocaleDateString("fr-MA")
                          : "-"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center ">
                        <span className="px-2 py-1   text-xs rounded-full bg-red-200 text-blue-800">
                          {player?.guardian?.phone}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium">
                        {/* <button 
                          onClick={() => handleDeletePlayer(player.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          🗑️
                        </button> */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-5 w-5 text-primary" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                handleUpdatePlayer(player);
                                setUpdate(true);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-pen-line-icon lucide-pen-line text-primary"
                              >
                                <path d="M13 21h8" />
                                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                              </svg>
                              Update
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeletePlayer(player.id)}
                              className="text-red-600"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-trash-icon lucide-trash text-red-500"
                              >
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                <path d="M3 6h18" />
                                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
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

        <PlayersForm
          setShowAddForm={setShowAddForm}
          playerToEdit={playerToEdit}
          showAddForm={showAddForm}
          update={update}
          setPlayerToEdit={setPlayerToEdit}
        />
      </div>

      <CartPlayer
        selectedPlayer={selectedPlayer}
        card={card}
        setCard={setCard}
      />
    </div>
  );
}
