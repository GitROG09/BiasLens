import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Database, Calendar, Eye, Trash2, ArrowRight, Microscope } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { AnalysisResults } from '../services/gemini';

interface StoredAnalysis {
  id: string;
  statement: string;
  results: AnalysisResults;
  timestamp: any;
  domain?: string;
}

export default function Library() {
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState<StoredAnalysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchAnalyses = async () => {
      try {
        const q = query(
          collection(db, 'analyses'),
          where('userId', '==', user.uid),
          orderBy('timestamp', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as StoredAnalysis[];
        setAnalyses(data);
      } catch (err) {
        console.error("Error fetching library:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, [user]);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Initiating delete for document ID:", id);
    if (!confirm("Are you sure you want to delete this analysis permanently?")) return;
    try {
      // Use collection reference to create document reference for absolute certainty
      const analysesCol = collection(db, 'analyses');
      const docRef = doc(analysesCol, id);
      console.log("Delete target path:", docRef.path);
      
      await deleteDoc(docRef);
      console.log("Firestore delete operation completed");
      
      alert("Success: Analysis purged from archive.");
      setAnalyses(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error("FIREBASE DELETE FAILURE:", err);
      alert(`Delete rejected by server: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleClearAll = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Initiating bulk clear all archive");
    if (!confirm("CRITICAL ACTION: This will permanently purge your entire intelligence vault. This cannot be undone. Proceed?")) return;
    
    setLoading(true);
    try {
      console.log(`Deleting ${analyses.length} items...`);
      const deletePromises = analyses.map(a => {
        console.log(`Scheduling delete for: ${a.id}`);
        return deleteDoc(doc(db, 'analyses', a.id));
      });
      await Promise.all(deletePromises);
      console.log("Bulk delete successful");
      setAnalyses([]);
    } catch (err) {
      console.error("Critical Error during bulk deletion:", err);
      alert(`Mass deletion failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
        <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-6 border border-slate-800">
          <Database className="text-sky-500 w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Connect to access your Library</h2>
        <p className="text-slate-400 max-w-md mb-8">
          Historical analyses are stored securely in your encrypted personal cloud vault.
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="p-8 max-w-6xl mx-auto"
    >
      <div className="flex justify-between items-end mb-12 border-b border-slate-800 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-4 text-sky-500">
            <div className="bg-sky-500/10 p-2 rounded">
              <Database className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.3em]">Vault Archive</span>
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Your Intelligence Library</h1>
        </div>
        <div className="flex flex-col items-end gap-4">
          <div className="text-right">
            <div className="text-3xl font-mono text-slate-700">{analyses.length.toString().padStart(2, '0')}</div>
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Total Reports</div>
          </div>
          {analyses.length > 0 && (
            <button 
              onClick={(e) => handleClearAll(e)}
              className="text-[10px] text-red-500/60 hover:text-red-500 font-bold uppercase tracking-widest flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              Clear All Archive
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-48 rounded bg-slate-900/50 border border-slate-800 animate-pulse"></div>
          ))}
        </div>
      ) : analyses.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-20 text-center">
          <Microscope className="w-12 h-12 text-slate-700 mx-auto mb-6" />
          <h3 className="text-xl font-bold text-slate-400 mb-2">No archived data found</h3>
          <p className="text-slate-500 mb-8">Start a new analysis to populate your personal intelligence vault.</p>
          <Link 
            to="/analysis"
            className="inline-flex items-center gap-2 bg-sky-500 text-slate-950 px-6 py-3 rounded font-black text-xs uppercase tracking-widest hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/20"
          >
            Initiate Scan
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analyses.map((analysis) => (
            <motion.div 
              key={analysis.id}
              whileHover={{ scale: 1.01, borderColor: '#0ea5e9' }}
              className="bg-slate-900 border border-slate-800 rounded-lg p-6 transition-all group overflow-hidden relative"
            >
              <div className="absolute top-2 right-2 z-20">
                <button 
                  onClick={(e) => handleDelete(e, analysis.id)}
                  className="text-slate-600 hover:text-red-500 transition-colors p-2 bg-slate-950/80 backdrop-blur-sm rounded border border-slate-800/50 hover:border-red-500/50"
                  title="Delete analysis"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-4 h-4 text-sky-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {analysis.timestamp?.toDate ? analysis.timestamp.toDate().toLocaleDateString() : 'Recent'}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {analysis.domain || 'General'}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-4 line-clamp-2 min-h-[3.5rem]">
                {analysis.statement}
              </h3>

              <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-800/50">
                <div className="flex gap-2">
                  <div className="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-[10px] font-mono text-sky-500">
                    Intensity: {Math.max(...Object.values(analysis.results.intensity) as number[])}%
                  </div>
                </div>
                <Link 
                  to="/results" 
                  state={{ results: analysis.results }}
                  className="flex items-center gap-2 text-sky-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                >
                  View Report
                  <Eye className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
