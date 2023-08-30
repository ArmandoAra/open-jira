
import { CardContent, CardHeader, Card, Grid } from '@mui/material'
import { Layout } from '@/components/layouts'
import { NewEntry } from '@/components/entry'
import { EntryList } from '@/components/entry'
import { EntryStatus } from '../interfaces/entry';

import { CardsContainer } from '../containers/cardsContainer'


export default function Home() {

  return (
    <Layout>
      <CardsContainer />
    </Layout>
  )
}


