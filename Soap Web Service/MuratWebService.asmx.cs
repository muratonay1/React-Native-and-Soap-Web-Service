using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data.SqlClient;
using System.Web.Configuration;
using System.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text;

namespace WebApplication1
{

    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class MuratWebService : System.Web.Services.WebService
    {
        string alert;
        public string tableRespose(string sql) //SORGULAMA YAPMAK İÇİN 
        {

            SqlConnection conn = new SqlConnection(WebConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString);
            conn.Open();
            SqlCommand cmd = new SqlCommand(sql, conn);

            DataTable dataTable = new DataTable();
            SqlDataAdapter da = new SqlDataAdapter(cmd);
            da.Fill(dataTable);
            conn.Close();
            da.Dispose();
            string x = DataTableToJsonObj(dataTable);
            return x;
        }
        public void QueryRequest(string sql) // İNSERT UPDATE DELETE YAPMAK İÇİN
        {
            SqlConnection conn = new SqlConnection(WebConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString);
            SqlCommand cmd = new SqlCommand(sql, conn);
            conn.Open();
            cmd.ExecuteNonQuery();

        }
        public static string DataTableToJsonObj(DataTable dt) //Datatablei düzgün json objesine dönüştürüyor.
        {
            DataSet ds = new DataSet();
            ds.Merge(dt);
            StringBuilder JsonString = new StringBuilder();
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                JsonString.Append("[");
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    JsonString.Append("{");
                    for (int j = 0; j < ds.Tables[0].Columns.Count; j++)
                    {
                        if (j < ds.Tables[0].Columns.Count - 1)
                        {
                            JsonString.Append("\"" + ds.Tables[0].Columns[j].ColumnName.ToString() + "\":" + "\"" + ds.Tables[0].Rows[i][j].ToString() + "\",");
                        }
                        else if (j == ds.Tables[0].Columns.Count - 1)
                        {
                            JsonString.Append("\"" + ds.Tables[0].Columns[j].ColumnName.ToString() + "\":" + "\"" + ds.Tables[0].Rows[i][j].ToString() + "\"");
                        }
                    }
                    if (i == ds.Tables[0].Rows.Count - 1)
                    {
                        JsonString.Append("}");
                    }
                    else
                    {
                        JsonString.Append("},");
                    }
                }
                JsonString.Append("]");
                return JsonString.ToString();
            }
            else
            {
                return null;
            }
        }


        [WebMethod]
         public string GirisUlke(string sehir_ismi) //başlangıçta seçilen ülkedeki bütün ilanları gösteriyor.
        {
            string query1 = "select Id from Sehirler where Name='" + sehir_ismi + "'";
            return tableRespose(query1);
        }
        [WebMethod]
        public string MeslekSayar() //başlangıçta ülkeyi seçtikten sonra mesleklerin yanında o ülkedeki o mesleğin sayısının tutulması
        {
            string query2 = "select meslek_ismi,Meslek_Id,count(Meslek_Id)as'ilan_sayisi' from TumIlanlar " +
                "inner join Meslekler on TumIlanlar.Meslek_Id=Meslekler.Id group by meslek_ismi,Meslek_Id";
            return tableRespose(query2);
        }


        [WebMethod]//Kullanılmıyor
        public string UlkeList() //başlangıçta ülkeyi seçtikten sonra mesleklerin yanında o ülkedeki o mesleğin sayısının tutulması
        {
            string query = "select distinct ulke_ismi from ulkeler right outer join ilanlar on ulkeler.id=ilanlar.ulke_id ";
            return tableRespose(query);
        }



        [WebMethod]
        public string MeslekIlanlari(int meslek_id)
        {
            string query = "select Meslekler.Meslek_Ismi,TumIlanlar.Aciklama," +
                "Sehirler.Name,Ilceler.isim,TumIlanlar.Telefon,TumIlanlar.Ilan_Baslik " +
                "from TumIlanlar inner join Meslekler on TumIlanlar.Meslek_Id=Meslekler.Id inner join " +
                "Sehirler on Sehirler.Id=TumIlanlar.Sehir_Id inner join Ilceler on Ilceler.ilce_no=TumIlanlar.Ilce_Id " +
                "where TumIlanlar.Meslek_Id='" + meslek_id + "'";
            return tableRespose(query);
        }

       
        [WebMethod]
        public void Kayıt_Service(string e_mail, string sifre, string ulke,string sehir, string ilce) //   ÜYE KAYDI
        {
            
            string query = "insert into uyeler (e_mail,sifre,ulke,sehir,ilce)"+"VALUES('"+e_mail+ "','" + sifre + "','" + ulke + "','" + sehir + "','" + ilce + "')";
            SqlConnection conn = new SqlConnection(WebConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString);
            SqlCommand cmd = new SqlCommand(query, conn);
            conn.Open();
            cmd.ExecuteNonQuery();
        }

        [WebMethod]
        public string Sehir_Isimleri() //   Sehir isimleri (Ülke olarak sadece Türkiye var)
        {
            string query = "select Id,Name from Sehirler";
            return tableRespose(query);
        }

        [WebMethod]
        public string Ilce_Isimleri(string sehir)
        {
            string query = "select Ilceler.ilce_no,Ilceler.isim from Ilceler inner join Sehirler on ilceler.il_no=Sehirler.Id where Sehirler.Name='"+sehir+"'";
            return tableRespose(query);
        }


        [WebMethod]
        public string Ilanlarim(string Uye_id)
        {
            string query = "select Meslekler.Meslek_Ismi,TumIlanlar.Aciklama,Sehirler.Name,Ilceler.isim,TumIlanlar.Telefon,TumIlanlar.Ilan_Baslik " +
                "from TumIlanlar inner join Meslekler on TumIlanlar.Meslek_Id=Meslekler.Id inner join Sehirler on Sehirler.Id=TumIlanlar.Sehir_Id " +
                "inner join Ilceler on Ilceler.ilce_no=TumIlanlar.Ilce_Id where TumIlanlar.Kullanici_Id='"+Uye_id+"'";

            return tableRespose(query);
        }


        [WebMethod]

        public string Uye_Ol(string isim,string soyisim,string e_mail,string telefon,string sifre, int sehir_id,int ilce_id)
        {
            try
            {
                string query3 = "insert into Uyeler (Isim,Soyisim,E_Mail,Telefon,Sifre,Sehir_Id,Ilce_Id) values " +
                    "('" + isim.ToString() + "','" + soyisim.ToString() + "','" + e_mail.ToString() + "','" + telefon.ToString() + "','" + sifre.ToString() + "','" + sehir_id + "','" + ilce_id + "')";
                SqlConnection conn = new SqlConnection(WebConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString);
                SqlCommand cmd = new SqlCommand(query3, conn);
                conn.Open();
                cmd.ExecuteNonQuery();
                alert = "ok";
            }
            catch( Exception e)
            {
                alert="error";
            }
            return alert;
        }

        [WebMethod]

        public string Giris_Yap(string e_mail,string sifre)
        {
            
            try
            {
                string query = "select Uyeler.Id,Uyeler.Isim,Uyeler.Soyisim,Uyeler.E_Mail,Uyeler.Telefon,Uyeler.Sifre,Uyeler.Sehir_Id,Uyeler.Ilce_Id,Sehirler.Name,Ilceler.isim " +
                    "from Uyeler inner join Sehirler on Uyeler.Sehir_Id=Sehirler.Id inner join Ilceler on Uyeler.Ilce_Id=Ilceler.ilce_no " +
                    "where Uyeler.E_Mail='" + e_mail + "' and Uyeler.Sifre='" + sifre + "'";
                if(tableRespose(query)=="")
                {
                    alert = "üye bulunamadı";
                    return alert;
                }
                else
                {
                    return tableRespose(query);
                }
                
            }
            catch(Exception e)
            {
                alert = "loginError";
                return alert;
            }        
        }

        [WebMethod]

        public string Meslek_Goster()
        {
            string query = "select * from Meslekler";
            return tableRespose(query);
        }

        [WebMethod]

        public string Ilan_Yayinla(string kullanici_id, string meslek_id, string aciklama, int sehir_id,int ilce_id,string telefon,string ilan_baslik)
        {   
            try
            {
                string query = "insert into TumIlanlar (Kullanici_Id,Meslek_Id,Aciklama,Sehir_Id,Ilce_Id,Telefon,Ilan_Baslik) " +
                    "values('" + kullanici_id + "','" + meslek_id + "','" + aciklama + "','" + sehir_id + "','"+ilce_id+"','" + telefon + "','" + ilan_baslik + "')";
                SqlConnection conn = new SqlConnection(WebConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString);
                SqlCommand cmd = new SqlCommand(query, conn);
                conn.Open();
                cmd.ExecuteNonQuery();
                alert = "ok";

            }
            catch(Exception e)
            {
                alert = "error";
            }
            
            
            return alert;
        }      

    }
  
}
