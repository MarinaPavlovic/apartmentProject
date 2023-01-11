import ApartmentList from "../components/apartments/ApartmentList";
import { useState, useEffect } from "react";

function SkiingPage(){
    const [isLoading, setIsLoading] = useState(true);
    const [loadedMeetups, setLoadedMeetups] = useState([]);
  
    useEffect(()=> {
      setIsLoading(true);
      
      fetch(
        'http://localhost:1313/apartment/get/type',{
          method: 'POST',
          body: 
            JSON.stringify({type: "SKIING"})
          ,
          headers: {
              'Content-Type' : 'application/json'

        }
      } 
       
        ).then(response => {
          return response.json();
        })
        .then((data) => {
          const meetups= [];
  
          for (const key in data){
            const meetup={
              id: key,
              ...data[key]
          };
           
  
          
          meetups.push(meetup);
        }
        setIsLoading(false);
        setLoadedMeetups(meetups);
    
        });
  
    },[]);
  
    
  
      if (isLoading){
        return(
          <section>
            <p>Loading...</p>
          </section>
        )
      }
  
  
      return (
          <section>
              
              <ApartmentList meetups={loadedMeetups}/>  
          </section>
      ); 
  
      
  }
  
  export default SkiingPage;