interface Item {
  id: number;
  nombre: string;
  descripcion: string;
}

interface Props {
  items: Item[];
  eliminarItem: (id: number) => void;
  editar: (item: Item) => void;
}

export default function List({ items, eliminarItem, editar }: Props) {
  if (items.length === 0) return <p>No hay elementos aún.</p>;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <strong>{item.nombre}</strong> - {item.descripcion}
          </div>
          <div>
            <button
              className="btn btn-warning btn-sm me-2"
              onClick={() => editar(item)}
              title="Editar"
            >
              ✏️
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => eliminarItem(item.id)}
              title="Eliminar"
            >
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
