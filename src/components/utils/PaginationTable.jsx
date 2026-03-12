import React from "react";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";

const btnBase = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "32px",
  height: "32px",
  padding: "0 0.5rem",
  fontSize: "0.82rem",
  fontWeight: "500",
  borderRadius: "0.375rem",
  border: "1px solid #dee2e6",
  backgroundColor: "white",
  color: "#212529",
  cursor: "pointer",
  lineHeight: 1,
  transition: "background 0.15s, color 0.15s, border-color 0.15s",
  userSelect: "none",
};

const btnDisabled = {
  ...btnBase,
  color: "#adb5bd",
  borderColor: "#e9ecef",
  backgroundColor: "#f8f9fa",
  cursor: "not-allowed",
  pointerEvents: "none",
};

const btnActive = {
  ...btnBase,
  backgroundColor: "#212529",
  color: "white",
  borderColor: "#212529",
  cursor: "default",
};

const PaginBtn = ({ onClick, disabled, active, children }) => {
  const style = disabled ? btnDisabled : active ? btnActive : btnBase;
  return (
    <button
      style={style}
      onClick={disabled || active ? undefined : onClick}
      onMouseEnter={(e) => {
        if (!disabled && !active) {
          e.currentTarget.style.backgroundColor = "#f1f3f5";
          e.currentTarget.style.borderColor = "#adb5bd";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !active) {
          e.currentTarget.style.backgroundColor = "white";
          e.currentTarget.style.borderColor = "#dee2e6";
        }
      }}
    >
      {children}
    </button>
  );
};

export const PaginationTable = ({ currentPage, totalPages, goToPage }) => {
  const pages = [];

  if (currentPage - 2 > 0) pages.push(currentPage - 2);
  if (currentPage - 1 > 0) pages.push(currentPage - 1);
  pages.push(currentPage);
  if (currentPage + 1 <= totalPages) pages.push(currentPage + 1);
  if (currentPage + 2 <= totalPages) pages.push(currentPage + 2);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {/* Primera */}
      <PaginBtn onClick={() => goToPage(1)} disabled={currentPage === 1}>
        <BsChevronDoubleLeft size={12} />
      </PaginBtn>
      {/* Anterior */}
      <PaginBtn onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
        <BsChevronLeft size={12} />
      </PaginBtn>

      {pages[0] > 1 && (
        <span style={{ color: "#adb5bd", fontSize: "0.82rem", padding: "0 2px" }}>…</span>
      )}

      {pages.map((p) => (
        <PaginBtn key={p} onClick={() => goToPage(p)} active={p === currentPage}>
          {p}
        </PaginBtn>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <span style={{ color: "#adb5bd", fontSize: "0.82rem", padding: "0 2px" }}>…</span>
      )}

      {/* Siguiente */}
      <PaginBtn onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
        <BsChevronRight size={12} />
      </PaginBtn>
      {/* Última */}
      <PaginBtn onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>
        <BsChevronDoubleRight size={12} />
      </PaginBtn>
    </div>
  );
};
