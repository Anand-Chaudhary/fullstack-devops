import { Editor } from "@monaco-editor/react"
import { useRef, useMemo } from "react";
import * as Y from 'yjs';
import { SocketIOProvider } from "y-socket.io";
import { MonacoBinding } from "y-monaco";


const App = () => {
  const editorRef = useRef(null);
  const ydoc = useMemo(() => new Y.Doc(), []);
  const yText = useMemo(() => ydoc.getText('monaco'), [ydoc]);

  const handleMount = (editor: any) => { //eslint-disable-line
    editorRef.current = editor;

    const provider = new SocketIOProvider('http://localhost:3000', 'monaco', ydoc, {
      autoConnect: true,
    });
    const monacoBinding = new MonacoBinding(yText, editor.getModel(), new Set([editor]), provider.awareness);
  }

  return (
    <main className='w-full h-screen bg-black gap-4 p-4 flex text-white'>
      <aside className="bg-amber-100 rounded-xl h-full w-1/4" ></aside>
      <section className="h-full w-full rounded-xl overflow-hidden">
        <Editor
          height="100%"
          theme="vs-dark"
          defaultLanguage="javascript"
          defaultValue="console.log('Hello World!!')"
          onMount={handleMount}
        />
      </section>
    </main>
  )
}

export default App