import React, { useState } from 'react';
import { ChevronDown, ChevronUp, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  badge?: string;
}

interface LeadershipTeamProps {
  members: TeamMember[];
}

const LeadershipTeamCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
         <div className="relative bg-gray-50 h-80 md:h-96 flex items-center justify-center">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-contain"
        />
        {member.badge && (
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
              {member.badge}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
        <p className="text-primary font-medium mb-3">{member.role}</p>
        
        {!isExpanded && (
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {member.bio.substring(0, 150)}...
          </p>
        )}
        
        {isExpanded && (
          <div className="text-gray-600 text-sm leading-relaxed mb-4 space-y-3">
            {member.bio.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2"
        >
          <User className="h-4 w-4" />
          {isExpanded ? 'Hide Profile' : 'View Profile'}
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

const LeadershipTeam: React.FC<LeadershipTeamProps> = ({ members }) => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the passionate founders and leaders driving innovation at Impala Healthtech Research
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {members.map((member) => (
            <LeadershipTeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;