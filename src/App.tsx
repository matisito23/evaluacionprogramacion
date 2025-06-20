import { useState, useEffect } from "react";
import Form from "./Form";
import List from "./List";

interface Item {
  id: number;
  nombre: string;
  descripcion: string;
}

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [editando, setEditando] = useState(false);
  const [itemEdit, setItemEdit] = useState<Item | null>(null);
  const [mensaje, setMensaje] = useState<{ texto: string; tipo: string }>({ texto: "", tipo: "" });

  useEffect(() => {
    const datosGuardados = localStorage.getItem("items");
    if (datosGuardados) setItems(JSON.parse(datosGuardados));
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const guardarItem = (nuevoItem: Omit<Item, "id">) => {
    if (editando && itemEdit) {
      const actualizados = items.map((item) =>
        item.id === itemEdit.id ? { ...nuevoItem, id: itemEdit.id } : item
      );
      setItems(actualizados);
      setMensaje({ texto: "Elemento actualizado correctamente", tipo: "success" });
      setEditando(false);
      setItemEdit(null);
    } else {
      setItems([...items, { ...nuevoItem, id: Date.now() }]);
      setMensaje({ texto: "Elemento agregado correctamente", tipo: "success" });
    }
    setTimeout(() => setMensaje({ texto: "", tipo: "" }), 3000);
  };

  const eliminarItem = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este elemento?")) {
      setItems(items.filter((item) => item.id !== id));
      setMensaje({ texto: "Elemento eliminado correctamente", tipo: "success" });
      setTimeout(() => setMensaje({ texto: "", tipo: "" }), 3000);
      if (editando && itemEdit?.id === id) {
        setEditando(false);
        setItemEdit(null);
      }
    }
  };

  const editar = (item: Item) => {
    setEditando(true);
    setItemEdit(item);
    setMensaje({ texto: "", tipo: "" });
  };

  return (
    <main className="container mt-5">
      <h1 className="mb-4">Mi app CRUD con validación y almacenamiento</h1>

      {mensaje.texto && (
        <div className={`alert alert-${mensaje.tipo}`} role="alert">
          {mensaje.texto}
        </div>
      )}

      <Form guardarItem={guardarItem} editando={editando} itemEdit={itemEdit} />
      <List items={items} eliminarItem={eliminarItem} editar={editar} />
    </main>
  );
}
