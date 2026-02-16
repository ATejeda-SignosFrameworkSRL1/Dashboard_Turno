alter proc [dbo].[spc_LoginAdminDashBoard]
@user_name varchar(100),
@user_pass varchar(100)
as 
/* 
LS: 18/12/2024 - Creacion
*/
begin
set nocount on

declare @login_state varchar(10) = ''
declare @login_count int = 0

select @login_count = (
select top 1
	--UserName,
	--Contrasena,
	count(*)
from 
	DbGlobalSecurity.dbo.Usuarios
where 
	UserName COLLATE Latin1_General_CS_AS  = trim(@user_name) and 
	Contrasena COLLATE Latin1_General_CS_AS  = trim(@user_pass) and 
	Activo = 1 
)

if (@login_count > 0)
begin
   set @login_state = 'True'
end
else
begin
  set @login_state = 'False'
end

select @login_state as Result

end
go
exec [dbo].[spc_LoginAdminDashBoard] 'admin','Admin'