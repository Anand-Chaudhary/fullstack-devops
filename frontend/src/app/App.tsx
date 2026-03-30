import { Editor } from "@monaco-editor/react"

const App = () => {
  return (
    <main className='w-full h-screen bg-black gap-4 p-4 flex text-white'>
      <aside className="bg-amber-100 rounded-xl h-full w-1/4" ></aside>
      <section className="h-full w-full rounded-xl overflow-hidden">
        <Editor
          height="100%"
          theme="vs-dark"
          defaultLanguage="javascript"
          defaultValue="console.log('Hello World!!')"
        />
      </section>
    </main>
  )
}

export default App