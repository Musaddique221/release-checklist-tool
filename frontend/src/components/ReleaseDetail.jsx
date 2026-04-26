import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getReleaseById, updateRelease, deleteRelease } from "../api/releaseApi";

const STEPS = [
  "All relevant GitHub pull requests have been merged",
  "CHANGELOG.md files have been updated",
  "All tests are passing",
  "Releases in Github created",
  "Deployed in demo",
  "Tested thoroughly in demo",
  "Deployed in production",
];

const ReleaseDetail = ({ id, onBack, onDeleted }) => {
  const [release, setRelease] = useState(null);
  const [steps, setSteps] = useState(Array(7).fill(false));
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getReleaseById(id);
        const data = res.data.data;
        setRelease(data);
        setSteps(data.steps);
        setAdditionalInfo(data.additionalInfo || "");
      } catch {
        toast.error("Failed to load release");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleStepToggle = (index) => {
    const updated = [...steps];
    updated[index] = !updated[index];
    setSteps(updated);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await updateRelease(id, { steps, additionalInfo });
      toast.success(res.data.message);
    } catch {
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await deleteRelease(id);
      toast.success(res.data.message);
      onDeleted();
    } catch {
      toast.error("Failed to delete release");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-400 py-20 text-sm">Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb + Delete */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm">
          <button onClick={onBack} className="text-indigo-500 hover:underline">
            All releases
          </button>
          <span className="text-gray-400">›</span>
          <span className="text-indigo-400">{release?.name}</span>
        </div>
        <button
          onClick={handleDelete}
          className="flex items-center gap-1 bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Delete 🗑
        </button>
      </div>

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
        {/* Release name + Date */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Release</label>
            <input
              type="text"
              value={release?.name || ""}
              readOnly
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-700"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Date</label>
            <input
              type="text"
              value={
                release?.date
                  ? new Date(release.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""
              }
              readOnly
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-700"
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-2">
          {STEPS.map((step, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={steps[i]}
                onChange={() => handleStepToggle(i)}
                className="w-4 h-4 accent-indigo-600 cursor-pointer"
              />
              <span className={`text-sm ${steps[i] ? "text-gray-400 line-through" : "text-gray-700"}`}>
                {step}
              </span>
            </label>
          ))}
        </div>

        {/* Additional remarks */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Additional remarks / tasks
          </label>
          <textarea
            rows={4}
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="Please enter any other important notes for the release"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
          />
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-indigo-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save ✓"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReleaseDetail;
