import { useAxios } from "./use-axios";

const useReservations = () => {
    const {get} = useAxios();
  
    const getReservations = async () => {
      return await get('/reservations')
    }
  
    return { getReservations }
  }
  
  export {useReservations};