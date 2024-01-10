"use client"

import styles from "./page.module.css";

import Gallery from "./gallery";
import { useFetch } from "./hooks/useFetch";
import { User } from "./types/user";
import { Hero } from "./types/dota";

export default function Home() {
  const {
    data: userData,
    error: userError,
    isLoading: userLoading
  } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users')
  const {
    data: heroData,
    error: heroError,
    isLoading: heroLoading
  } = useFetch<Hero[]>('https://api.opendota.com/api/heroes')

  return (
    <main className={styles.main}>
      {userLoading || heroLoading ?
        <div>Fetching data...</div> : userError || 
        heroError ? 
        <div>An error occured.</div> :
        <Gallery users={userData ?? []} heroes={heroData ?? []}/>}
    </main>
  );
}
