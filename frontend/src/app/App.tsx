import { Editor } from "@monaco-editor/react"
import { useRef, useMemo, useState, useEffect } from "react";
import * as Y from 'yjs';
import { SocketIOProvider } from "y-socket.io";
import { MonacoBinding } from "y-monaco";

const App = () => {
  const editorRef = useRef(null);
  const [username, setUsername] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('username') || '';
  });
  const [connectedUsers, setConnectedUsers] = useState<{ username: string }[]>([]);
  const ydoc = useMemo(() => new Y.Doc(), []);
  const yText = useMemo(() => ydoc.getText('monaco'), [ydoc]);

  const handleJoin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsername((e.target as HTMLFormElement).username.value);
    window.history.pushState({}, '', `?username=${(e.target as HTMLFormElement).username.value}`);
  };

  useEffect(() => {
    if (username) {
      const provider = new SocketIOProvider('http://localhost:3000', 'monaco', ydoc, {
        autoConnect: true,
      });
      provider.awareness.setLocalStateField('user', { username })

      const states = Array.from(provider.awareness.getStates().values());
      setConnectedUsers(states.filter((state: any) => state.user && state.user.username).map((state: any) => state.user)); //eslint-disable-line

      provider.awareness.on("change", () => {
        const states = Array.from(provider.awareness.getStates().values());
        setConnectedUsers(states.filter((state: any) => state.user && state.user.username).map((state: any) => state.user)); //eslint-disable-line
      })

      function handleBeforeUnload() {
        provider.awareness.setLocalStateField('user', null);
      }

      window.addEventListener('beforeunload', handleBeforeUnload);



      return () => {
        provider.disconnect();
        window.removeEventListener('beforeunload', handleBeforeUnload);
      }
    }
  }, [
    username,
    yText,
    ydoc
  ])

  const handleMount = (editor: any) => { //eslint-disable-line
    editorRef.current = editor;
    new MonacoBinding(yText, editor.getModel(), new Set([editor]));

  }

  if (!username) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <form onSubmit={handleJoin} className="border text-white space-y-3 border-amber-50 p-8 rounded-xl">
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="rounded-lg outline-none bg-gray-800 text-white p-2 w-full"
          />
          <button className="p-2 rounded-lg w-full bg-amber-50 text-gray-900 font-bold">
            Join
          </button>
        </form>
      </div>
    )
  }

  return (
    <main className='w-full h-screen bg-black gap-4 p-4 flex text-white'>
      <aside className="bg-amber-100 rounded-xl h-full p-2 w-1/4" >
      <h1 className="text-2xl font-bold text-black">Users</h1>
        {connectedUsers.length > 0 ? (
          <ul className="p-4 space-y-2">
            {connectedUsers.map((user, index) => (
              <li key={index} className="bg-amber-50 text-gray-900 p-2 rounded-lg">
                {user?.username}
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-4 text-gray-500">No users connected</p>
        )}
      </aside>
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