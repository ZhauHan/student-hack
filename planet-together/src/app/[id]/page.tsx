import * as THREE from 'three'
import { Metadata, ResolvingMetadata } from 'next'
import { PrismaClient, Planet, System } from '@prisma/client'
import { PlanetData } from '../page'
import Home from '../page'
import { PageProps } from '../page'
type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}


export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata) {
  // read route params
  const prisma = new PrismaClient();
  const id = params.id
  return { title: params.id }
}


async function getSystemData(id: string) {
  const prisma = new PrismaClient();
  const SystemData = await prisma.system.findFirst({
    where:
    {
      id: id
    }
  })
  const planetData = await prisma.planet.findMany({
    where: {
      systemId: id
    }
  })
  return [SystemData, planetData]
}

export default async function Page({ params, searchParams }: Props) {
  const [SystemData, planetData] = await getSystemData(params.id);
  const pageData: PageProps = {
    system: SystemData as System,
    planets: planetData as Planet[],
  }
  return (
    <div>
      <Home {...pageData} />
    </div>

  )

}
