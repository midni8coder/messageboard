

/****** Object:  StoredProcedure [dbo].[usp_SaveUser]    Script Date: 09/29/21 12:51:05 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[usp_SaveUser]
GO

/****** Object:  StoredProcedure [dbo].[usp_SaveUser]    Script Date: 09/29/21 12:51:05 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


create proc [dbo].[usp_SaveUser](
	@UserName varchar(500),
	@Email varchar(500)
)
as
begin
	insert into [User](UserName,Email)
	values(@UserName,@Email)

	select * from [User]
end
GO


