import { TestProps } from 'features/Test/pages/Main/interface'

const Main: React.FC<TestProps> = ({ text }) => {
  return <div>Test text: {text}</div>
}

export default Main
