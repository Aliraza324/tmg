import { MOCK_DOCUMENTS } from "../data/documents";
import { storageService } from "./storageService";
import { caseService } from "./caseService";
import { mockDelay } from "./api";

const STORAGE_KEY = "tmg_documents";

function getStoredDocuments() {
  return storageService.get(STORAGE_KEY, MOCK_DOCUMENTS);
}

function saveStoredDocuments(docs) {
  storageService.set(STORAGE_KEY, docs);
}

export const documentService = {
  async getDocuments(filters = {}) {
    await mockDelay(100);
    let results = getStoredDocuments();

    if (filters.caseId) {
      results = results.filter((d) => d.caseId === filters.caseId || d.caseCode === filters.caseId);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.fileName.toLowerCase().includes(q) ||
          d.patientName.toLowerCase().includes(q)
      );
    }

    if (filters.fileType && filters.fileType !== "All") {
      results = results.filter((d) => d.fileType.toLowerCase() === filters.fileType.toLowerCase());
    }

    return results;
  },

  async uploadDocument(docData) {
    await mockDelay(200);
    const docs = getStoredDocuments();
    const newDoc = {
      id: `doc-${Date.now().toString().slice(-4)}`,
      uploadedDate: new Date().toISOString(),
      uploadedBy: docData.uploadedBy || "Staff Coordinator",
      isSensitive: true,
      fileSizeBytes: docData.fileSizeBytes || 1500000,
      fileType: docData.fileType || "PDF",
      ...docData
    };
    docs.unshift(newDoc);
    saveStoredDocuments(docs);

    if (newDoc.caseId) {
      await caseService.addTimelineEvent(newDoc.caseId, {
        stage: `Document Uploaded: ${newDoc.title}`,
        actor: newDoc.uploadedBy
      });
    }

    return newDoc;
  },

  async updateDocumentMetadata(id, updates) {
    await mockDelay(150);
    const docs = getStoredDocuments();
    const idx = docs.findIndex((d) => d.id === id);
    if (idx === -1) throw new Error("Document not found");

    const updated = {
      ...docs[idx],
      ...updates
    };
    docs[idx] = updated;
    saveStoredDocuments(docs);
    return updated;
  },

  async deleteDocument(id) {
    await mockDelay(100);
    const docs = getStoredDocuments();
    const docToDelete = docs.find((d) => d.id === id);
    const filtered = docs.filter((d) => d.id !== id);
    saveStoredDocuments(filtered);

    if (docToDelete && docToDelete.caseId) {
      await caseService.addTimelineEvent(docToDelete.caseId, {
        stage: `Document Removed: ${docToDelete.title}`,
        actor: "Staff Coordinator"
      });
    }

    return { success: true };
  }
};
