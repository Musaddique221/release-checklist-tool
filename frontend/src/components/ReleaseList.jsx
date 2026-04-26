import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllReleases, deleteRelease } from "../api/releaseApi";
import NewReleaseModal from "./NewReleaseModal";

const statusStyle = {
  planned: "bg-gray-100 text-gray-600",
  ongoing: "bg-yellow-100 text-yellow-700",
  done: "bg-green-100 text-green-700",
};

const ReleaseList = ({ onView }) => {
  const [releases, setReleases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchReleases = async () => {
    try {
      const res = await getAllReleases();
      setReleases(res.data.data);
    } catch {
      toast.error("Failed to fetch releases");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReleases();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      const res = await deleteRelease(id);
      toast.success(res.data.message);
      fetchReleases();
    } catch {
      toast.error("Failed to delete release");
    }
  };

  const getStatus = (steps) => {
    if (steps.every((s) => !s)) return "planned";
    if (steps.every((s) => s)) return "done";
    return "ongoing";
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-indigo-500 font-medium text-sm">All releases</span>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          New release <span className="text-lg leading-none">⊕</span>
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {loading ? (
          <p className="text-center text-gray-400 py-10 text-sm">Loading...</p>
        ) : releases.length === 0 ? (
          <p className="text-center text-gray-400 py-10 text-sm">No releases yet. Create one!</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Release</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Date</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {releases.map((release, i) => {
                const status = getStatus(release.steps);
                return (
                  <tr key={release._id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-5 py-3 text-gray-800">{release.name}</td>
                    <td className="px-5 py-3 text-gray-600">
                      {new Date(release.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusStyle[status]}`}>
                        {status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3 justify-end">
                        <button
                          onClick={() => onView(release._id)}
                          className="text-gray-500 hover:text-indigo-600 text-xs font-medium"
                        >
                          View 👁
                        </button>
                        <button
                          onClick={(e) => handleDelete(release._id, e)}
                          className="text-gray-400 hover:text-red-500 text-xs font-medium"
                        >
                          Delete 🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <NewReleaseModal
          onClose={() => setShowModal(false)}
          onCreated={fetchReleases}
        />
      )}
    </div>
  );
};

export default ReleaseList;
