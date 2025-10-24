import { useState } from 'react'
import { FileText, Download, Upload, Trash2, Eye, File, Image, FileSpreadsheet } from 'lucide-react'

const Documents = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      nome: 'Certificado - Workshop Empreendedorismo.pdf',
      tipo: 'pdf',
      tamanho: '2.4 MB',
      data_upload: '2024-01-20',
      categoria: 'Certificados'
    },
    {
      id: 2,
      nome: 'Plano de Negócios - Minha Startup.docx',
      tipo: 'docx',
      tamanho: '1.8 MB',
      data_upload: '2024-01-18',
      categoria: 'Documentos'
    },
    {
      id: 3,
      nome: 'Apresentação Pitch.pptx',
      tipo: 'pptx',
      tamanho: '5.2 MB',
      data_upload: '2024-01-15',
      categoria: 'Apresentações'
    },
    {
      id: 4,
      nome: 'Planilha Financeira.xlsx',
      tipo: 'xlsx',
      tamanho: '856 KB',
      data_upload: '2024-01-12',
      categoria: 'Planilhas'
    }
  ])

  const [selectedCategory, setSelectedCategory] = useState('todos')

  const categories = ['todos', 'Certificados', 'Documentos', 'Apresentações', 'Planilhas']

  const getFileIcon = (tipo) => {
    const icons = {
      pdf: <FileText className="text-red-600" size={24} />,
      docx: <FileText className="text-blue-600" size={24} />,
      pptx: <File className="text-orange-600" size={24} />,
      xlsx: <FileSpreadsheet className="text-green-600" size={24} />,
      jpg: <Image className="text-purple-600" size={24} />,
      png: <Image className="text-purple-600" size={24} />
    }
    return icons[tipo] || <File className="text-gray-600" size={24} />
  }

  const filteredDocuments = selectedCategory === 'todos'
    ? documents
    : documents.filter(doc => doc.categoria === selectedCategory)

  const handleDelete = (id) => {
    if (confirm('Deseja realmente excluir este documento?')) {
      setDocuments(documents.filter(doc => doc.id !== id))
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Meus Documentos</h1>
        <p className="text-gray-600 mt-2">Gerencie seus documentos e certificados</p>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-yellow-500 transition cursor-pointer">
          <Upload className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Enviar Documento</h3>
          <p className="text-gray-600 mb-4">Arraste e solte ou clique para selecionar</p>
          <button className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
            Selecionar Arquivo
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Formatos suportados: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, JPG, PNG (Máx: 10MB)
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedCategory === category
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Documentos */}
      {filteredDocuments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <FileText className="mx-auto text-gray-400 mb-4" size={64} />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum documento encontrado</h3>
          <p className="text-gray-600">Faça upload de seus documentos para começar</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tamanho
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          {getFileIcon(doc.tipo)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{doc.nome}</div>
                          <div className="text-sm text-gray-500">.{doc.tipo.toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {doc.categoria}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {doc.tamanho}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(doc.data_upload).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900" title="Visualizar">
                          <Eye size={18} />
                        </button>
                        <button className="text-green-600 hover:text-green-900" title="Baixar">
                          <Download size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Excluir"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Documentos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{documents.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Espaço Utilizado</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">10.2 MB</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileSpreadsheet className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Espaço Disponível</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">89.8 MB</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Upload className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Documents
