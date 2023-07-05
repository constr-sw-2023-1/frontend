import React, { useEffect, useState } from 'react';

import './Rooms.scss';

const RoomsListPage: React.FC = () => {
    const [rooms, setRooms] = useState([]);
    
    useEffect(() => {
        fetchRooms();
    }, []);
    const fetchRooms = async () => {
        try{
            const response = await fetch('http://localhost:8085/room',{
                headers:{
                    Authorization: " Bearer root"
                }
            });
            const data = await response.json();
            setRooms(data.rooms);
        } catch (error) {
            console.log("Erro ao pegar salas", error);
            
        }
    };
    
    return (
        <div>
          <h1>List of Rooms</h1>
          {rooms.length === 0 ? (
            <p>Loading rooms...</p>
          ) : (
            <ul>
              {rooms.map((room: any) => (
                <li key={room.id}>{room.name}</li>
              ))}
            </ul>
          )}
        </div>
      );
        };
        
        export default RoomsListPage;