import { Container } from "react-bootstrap";

/* 
Added by : Luis A. Sierra
Added Date: 12/12/2024'

Added Code:
-- variable _date para agregar año desde javascrpit
-- variable _year para mostrar año en el footer
-- link de la pagina official de Signos Framework
*/

const _date = new Date();
let _year = _date.getFullYear();

export const Footer = function () {
  return (
    <>
      <section className="d-flex justify-content-between p-2 footer">
        <Container>
          <footer className="d-flex align-items-center py-1">
            <div className="col-12 justify-content-center d-flex align-items-center">
              <span className="textFooter">
              Copyright © {_year} <a href="https://signos-framework.com">Signos Framework</a> All rights reserved. 
              </span>
            </div>
          </footer>
        </Container>
      </section>
    </>
  );
};
