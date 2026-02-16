USE [DbTurnosAsociacionMaguana]
GO
/****** Object:  StoredProcedure [dbo].[spc_GetAdminKeyDashBoard]    Script Date: 09/12/2024 5:06:47 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
alter proc [dbo].[spc_GetAdminKeyDashBoard]
as 
/* 
LS: 09/12/2024 - Creacion
LS: 17/12/2024 - Modificacion
*/
begin
 --select (select '1234' as [key] for json path, include_null_values) as JsonData 

select 
 (select 
  UserName [user],
  Contrasena [key] for json path, include_null_values) as [admin_users]
from [DbGlobalSecurity].[dbo].[Usuarios] 

end
GO 
exec spc_GetAdminKeyDashBoard

