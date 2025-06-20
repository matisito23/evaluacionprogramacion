import React, { useState, useEffect } from "react";

interface Item {
  id: number;
  nombre: string;
  descripcion: string;
}

interface Props {
  guardarItem: (nuevoItem: { nombre: string; descripcion: string }) => void;
  editando: boolean;
  itemEdit: Item | null;
}

export default function Form({ guardarItem, editando, itemEdit }: Props) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editando && itemEdit) {
      setNombre(itemEdit.nombre);
      setDescripcion(itemEdit.descripcion);
      setError("");
    } else {
      setNombre("");
      setDescripcion("");
      setError("");
    }
  }, [editando, itemEdit]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nombre.trim().length < 3 || descripcion.trim().length < 3) {
      setError("Los campos deben tener al menos 3 caracteres.");
      return;
    }

    setError("");
    guardarItem({ nombre: nombre.trim(), descripcion: descripcion.trim() });

    if (!editando) {
      setNombre("");
      setDescripcion("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <input
          type="text"
          placeholder="Nombre"
          className={`form-control ${error && nombre.trim().length < 3 ? "is-invalid" : ""}`}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          minLength={3}
        />
        <div className="invalid-feedback">El nombre debe tener al menos 3 caracteres.</div>
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Descripción"
          className={`form-control ${error && descripcion.trim().length < 3 ? "is-invalid" : ""}`}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          minLength={3}
        />
        <div className="invalid-feedback">La descripción debe tener al menos 3 caracteres.</div>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}

      <button
        className="btn btn-primary"
        disabled={nombre.trim().length < 3 || descripcion.trim().length < 3}
      >
        {editando ? "Actualizar" : "Agregar"}
      </button>
    </form>
  );
}
