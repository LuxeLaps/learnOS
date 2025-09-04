import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import CytoscapeComponent from 'cytoscape';

export default function RepoExplorer() {
  const { id } = useParams();
  const [elements, setElements] = useState([]);

  useEffect(() => {
    api.get(`/repos/${id}/graph`)
      .then(res => {
        const { nodes, edges } = res.data;
        setElements([
          ...nodes.map(n => ({ data: { id: n.id, label: n.file_path } })),
          ...edges.map(e => ({ data: { source: e.from_node_id, target: e.to_node_id } }))
        ]);
      })
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Repository Architecture</h1>
      <CytoscapeComponent
        elements={elements}
        style={{ width: "100%", height: "500px" }}
        layout={{ name: "breadthfirst" }}
        stylesheet={[
          {
            selector: "node",
            style: {
              label: "data(label)",
              "text-valign": "center",
              "background-color": "#4F46E5",
              color: "#fff",
              "font-size": "10px"
            }
          },
          {
            selector: "edge",
            style: {
              width: 2,
              "line-color": "#9CA3AF"
            }
          }
        ]}
      />
    </div>
  );
}
