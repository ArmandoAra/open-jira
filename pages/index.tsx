
import { CardContent, CardHeader, Card, Grid } from '@mui/material'
import { Layout } from '@/components/layouts'
import { NewEntry } from '@/components/entry'
import { EntryList } from '@/components/entry'



export default function Home() {
  return (
    <Layout>
      <Grid container spacing={2}>

        {/*################################## CARD 1 ############################################*/}
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Pendientes" />
            <CardContent>
              {/* Agregar una nueva entrada */}
              <NewEntry />
              {/* Listado de las entradas */}
              <EntryList status='pending' />
            </CardContent>
          </Card>
        </Grid>

        {/*################################## CARD 2 ############################################ */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="En Progreso" />
            <CardContent>
              {/* Agregar una nueva entrada */}
              {/* Listado de las entradas */}
              <EntryList status='in-progress' />
            </CardContent>
          </Card>
        </Grid>

        {/*################################## CARD 3 ############################################*/}
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Completadas" />
            <CardContent>
              {/* Agregar una nueva entrada */}
              {/* Listado de las entradas */}
              <EntryList status='done' />
            </CardContent>
          </Card>
        </Grid>

      </Grid>


    </Layout>
  )
}
