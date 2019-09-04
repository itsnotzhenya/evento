import generate from './generate'
import CRUDComponent from '@/components/Questions/CRUD'
import ListComponent from '@/components/Questions/table'

export default generate({
  moduleName: 'Question',
  path: 'questions',
  CRUDComponent,
  ListComponent
})
