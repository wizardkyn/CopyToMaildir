# AWS Lambda Javascript : SFTP Upload to Dovecot Maildir from AWS S3 Bucket
Mail Stored In S3 Bucket > 
Description : http://blog.naver.com/wizardkyn/220670022848

# Dependencies
aws-sdk<br>
ssh2<br>
stream<br>

# Tomcat Datasource JNDI
```
<GlobalNamingResources>
<Resource auth="Container" driverClassName="com.mysql.jdbc.Driver" 
loginTimeout="10" maxActive="200" maxIdle="8" maxWait="5000" 
name="jdbc/sim" username="dbuser" password="1234" 
type="javax.sql.DataSource"
url="jdbc:mysql://db.example.com:3306/exampledb?zeroDateTimeBehavior=convertToNull"/>      
</GlobalNamingResources>

<Context docBase="BootSocial" path="/BootSocial" reloadable="true">
<ResourceLink global="jdbc/sim" name="jdbc/sim" type="javax.sql.DataSource"/>
</Context>
```